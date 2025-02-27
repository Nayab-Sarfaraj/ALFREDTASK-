import { Router } from "express";
import {
  createFlashCard,
  deleteFlashCard,
  getAllFlashCard,
  updateFlashCard,
} from "../controller/flashcard.controller.js";
import isAuthenticated from "../middleware/auth.js";
const router = Router();

router.post("/", createFlashCard);
router.get("/:userID", getAllFlashCard);
router.put("/:id", updateFlashCard);
router.delete("/:id", deleteFlashCard);

export default router;
