import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import {CardSchema, TransactionSchema} from "../types.ts";
const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

const db = client.database("e_card");



db.collection<CardSchema>("cards");
db.collection<TransactionSchema>("transactions");

export default db;
