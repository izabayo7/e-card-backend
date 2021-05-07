import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

const db = client.database("e_card");

// Defining card schema interface
interface CardSchema {
    _id: { $oid: string };
    code: string;
    amount: string;
    // user: {
    //     type: string,
    //     ref: 'users'
    // }
}

db.collection<CardSchema>("cards");

export default db;
