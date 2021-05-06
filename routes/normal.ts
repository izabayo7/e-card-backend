import { Router } from "https://deno.land/std@0.50.0/oak/mod.ts";
import CardController from "../controllers/CardController.ts";
import { oakCors } from "https://deno.land/std@0.50.0/cors/mod.ts";
const router = new Router();

router
  .get("/card", CardController.getAll)
  .get("/card/:id", CardController.getById)
  .post("/card", CardController.createNew)
  .put("/card/:id", CardController.update)
  .delete("/card/:id", CardController.deleteCard);


export default router;
