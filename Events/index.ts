import EventEmitter from "https://deno.land/x/eventemitter@1.2.3/mod.ts";

const MyEmitter = new EventEmitter<{
    new_transaction (doc: any): any
}>();

export default  MyEmitter
