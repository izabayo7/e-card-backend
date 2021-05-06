import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
await init();
const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
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

const Card = db.collection<CardSchema>("cards");

export default {
    Card,
    db
};
