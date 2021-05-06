import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use((ctx)=>{
    ctx.response.body = "Hello Msz !!"
})

await app.listen({port: 4000});