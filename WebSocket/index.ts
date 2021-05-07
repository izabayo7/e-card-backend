import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
// import MyEmitter from "../Events/index.ts"

const wss = new WebSocketServer(8081);

// const event = require('events')

wss.on("connection", function (ws: WebSocketClient) {
  // console.log("connected", ws)

  addEventListener("new_transaction",(doc:any)=>{
    console.log(doc)
    ws.send(doc)
  })
  // MyEmitter.on("new_transaction",async (doc:any)=>{
  //   console.log(doc)
  //   ws.send(doc)
  // })
  ws.on("message",(message:any)=>{
    console.log(message)
    ws.send(message)
  })
});