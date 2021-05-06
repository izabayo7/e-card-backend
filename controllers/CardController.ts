import { db, Card } from "../config/databases.ts";
import { ObjectId } from "https://deno.land/std@0.50.0/mongo@v0.6.0/mod.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";

export default {
  async getAll(ctx: any) {
    const data = await Card.find();
    ctx.response.body = data;
  },
  async getById(ctx: any) {
    try {
      const data = await Card.findOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.body = data;
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Card not found." };
    }
  },
  async createNew(ctx: any) {
    const value = await validation.validateCardCreation(ctx);
    if (value) {
      value.created_at = parseInt((new Date().getTime() / 1000).toString());
      const new_user = await Card.insertOne(value);
      ctx.response.status = 201;
      ctx.response.body = new_user;
    }
  },
  async update(ctx: any) {
    const value = await validation.validateCardUpdate(ctx);
    if (value) {
      const data = {
        code: value.code,
        amount: value.amount,
      };
      try {
        await Card.updateOne({ _id: ObjectId(ctx.params.id) }, { $set: data });
        ctx.response.status = 200;
        ctx.response.body = { message: "updated" };
        // TODO create logs here
      } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Card not found." };
      }
    }
  },
  async deleteCard(ctx: any) {
    try {
      await Card.deleteOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.status = 204; // no content
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Card not found." };
    }
  },
};
