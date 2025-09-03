import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import cloudinary from "../uploads/cloudinary.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.use();
router.get("/profile", protect, getUserProfile);
router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    console.log("Uploading image to Cloudinary...");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "queazyLearnProfiles" }
    );

    const imageUrl = uploadResponse.secure_url;
    console.log("Image uploaded successfully:", imageUrl);

    return res
      .status(200)
      .json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});

export default router;
