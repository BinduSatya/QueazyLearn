import user from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// router.post("/register", registerUser);
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    const token = generateToken(newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profileImageUrl: newUser.profileImageUrl,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// router.post("/login", loginUser);
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      profileImageUrl: existingUser.profileImageUrl,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// router.get("/profile", protect, getUserProfile);
const getUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const existingUser = await user.findById(userId).select("-password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerUser, loginUser, getUserProfile };
