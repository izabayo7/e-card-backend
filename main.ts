import { Application } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.1.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";
import router from "./routes/normal.ts";
import notFound from "./404.ts";
const env = config();

const app = new Application();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 8080;

app.use(oakCors());
app.use(router.routes());
app.use(notFound);

console.log(`server is running at ${HOST}:${PORT}`);
await app.listen({ port: PORT });
