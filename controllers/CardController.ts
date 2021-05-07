import db from "../config/databases.ts";
import {Bson} from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import validation from "../validation.ts";
import {CardSchema} from "../types.ts";

const Card = db.collection("cards");
const Transaction = db.collection("transactions");
export default {
    async getAll(ctx: any) {
        const data = await Card.find().toArray();
        ctx.response.body = data;
    },
    async getById(ctx: any) {
        try {
            const data = await Card.findOne({_id: new Bson.ObjectId(ctx.params.id)});
            ctx.response.body = data;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = {error: "Card not found."};
        }
    },
    async getTransactionsByCard(ctx: any) {
        try {
            const data = await Transaction.find({card: new Bson.ObjectId(ctx.params.id)}).toArray();
            ctx.response.body = data;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = {error: "Card not found."};
        }
    },
    async createNew(ctx: any) {
        const value = await validation.validateCardCreation(ctx);
        if (value) {
            value.created_at = parseInt((new Date().getTime() / 1000).toString());
            const new_doc = await Card.insertOne(value);
            ctx.response.status = 201;
            ctx.response.body = new_doc;
        }
    },
    async update(ctx: any) {
        const value = await validation.validateCardCode(ctx);
        if (value) {
            const data = {
                code: value.code,
                amount: value.amount,
            };
            try {
                await Card.updateOne({_id: new Bson.ObjectId(ctx.params.id)}, {$set: data});
                ctx.response.status = 200;
                ctx.response.body = {message: "updated"};
            } catch (e) {
                ctx.response.status = 404;
                ctx.response.body = {error: "Card not found."};
            }
        }
    },
    async updateCardBalance(ctx: any) {
        const value = await validation.validateCardBalance(ctx);
        if (value) {
            const card:any = await Card.findOne({code: ctx.params.code});
            if (card) {
                if (card.amount >= value.amount || value.type == "deposit") {
                    const data = {
                        amount: value.type == 'deposit' ? card.amount + value.amount : card.amount - value.amount,
                    };

                    try {
                        await Card.updateOne({code: ctx.params.code}, {$set: data});
                        ctx.response.status = 200;
                        ctx.response.body = {message: "updated"};
                        const log_data = {
                            card: card._id,
                            type: value.type,
                            amount: value.amount,
                            created_at: parseInt((new Date().getTime() / 1000).toString());
                        }
                        const new_doc = await Transaction.insertOne(log_data);
                        ctx.response.status = 200;
                        ctx.response.body = {message: "updated", new_balance: data.amount};

                    } catch (e) {
                        ctx.response.status = 404;
                        ctx.response.body = {error: "Card not found."};
                    }
                } else {
                    ctx.response.status = 403;
                    ctx.response.body = {error: "Insufficient amount."};
                }
            } else {
                ctx.response.status = 403;
                ctx.response.body = {error: "Card not found."};
            }
        }
    },
    async deleteCard(ctx: any) {
        try {
            await Card.deleteOne({_id: new Bson.ObjectId(ctx.params.id)});
            ctx.response.status = 204; // no content
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = {error: "Card not found."};
        }
    },
};
