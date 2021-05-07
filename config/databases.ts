import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

const db = client.database("e_card");

// Defining card schema interface
interface CardSchema {
    _id: { $oid: string };
    code: {
        type: string,
        unique: true
    };
    amount: string;
    // user: {
    //     type: string,
    //     ref: 'users'
    // }
}

// Defining transaction schema interface
interface TransactionSchema {
    _id: { $oid: string };
    card: { $oid: string };
    type: {
        type: string,
        enum: ['deposit','withdraw']
    };
    amount: string
}

db.collection<CardSchema>("cards");
db.collection<TransactionSchema>("transactions");

export default db;
