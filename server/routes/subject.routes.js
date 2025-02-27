import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
} from "../controller/subjec.controller.js";
import isAuthenticated from "../middleware/auth.js";
const router = Router();
router.post("/", isAuthenticated, createSubject);
router.get("/", getAllSubject);
router.delete("/", isAuthenticated, deleteSubject);
export default router;
