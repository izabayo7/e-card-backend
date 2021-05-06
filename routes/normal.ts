import { Router } from "https://deno.land/x/oak/mod.ts";
import CardController from "../controllers/CardController.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const router = new Router();

router
  .get("/card", CardController.getAll)
  .get("/card/:id", CardController.getById)
  .post("/card", CardController.createNew)
  .put("/card/:id", CardController.update)
  .delete("/card/:id", CardController.destroy);


export default router;
