import express, { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSession,
  deleteSession,
  getSessionById,
  getUserSessions,
} from "../controllers/sessionController.js";

const router = Router();

router.post("/create", protect, createSession);
router.get("/user-sessions", protect, getUserSessions);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

export default router;
