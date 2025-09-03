import express, { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNote,
} from "../controllers/questionController.js";

const router = Router();

router.post("/add", protect, addQuestionToSession);
router.post("/:id/pin", protect, togglePinQuestion);
router.put("/:id/note", protect, updateQuestionNote);

export default router;
