import { Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import CardController from "../controllers/CardController.ts";
const router = new Router();

router
  .get("/card", CardController.getAll)
  .get("/card/:id", CardController.getById)
  .post("/card", CardController.createNew)
  .put("/card/:id", CardController.update)
  .delete("/card/:id", CardController.deleteCard);


export default router;
