import { Router } from "express";
import {
  getUserData,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/auth.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUserData);
router.get("/logout", logout);

export default router;
