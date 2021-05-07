import db  from "../config/databases.ts";
import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import validation from "../validation.ts";
const Card = db.collection("cards");
export default {
  async getAll(ctx: any) {
    const data = await Card.find();
    console.log(data)
    ctx.response.body = data;
  },
  async getById(ctx: any) {
    try {
      const data = await Card.findOne({ _id: new Bson.ObjectId(ctx.params.id) });
      ctx.response.body = data;
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Card not found." };
    }
  },
  async createNew(ctx: any) {

    //ctx.request.body({type:"application/json"})
    const result = ctx.request.body({
      contentTypes: {
        text: ["application/javascript"],
      },
    })

    console.log(await result.value)

    const value = await validation.validateCardCreation(ctx);
    if (value) {
      value.created_at = parseInt((new Date().getTime() / 1000).toString());
      const new_doc = await Card.insertOne(value);
      ctx.response.status = 201;
      ctx.response.body = new_doc;
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
        await Card.updateOne({ _id: new Bson.ObjectId(ctx.params.id) }, { $set: data });
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
      await Card.deleteOne({ _id: new Bson.ObjectId(ctx.params.id) });
      ctx.response.status = 204; // no content
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Card not found." };
    }
  },
};
