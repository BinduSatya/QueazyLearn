import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  postProfileImg,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
router.post("/upload-image", upload.single("image"), postProfileImg);

export default router;
