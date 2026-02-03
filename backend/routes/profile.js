const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// GET logged-in user's profile
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// UPDATE logged-in user's profile
router.put("/me", auth, async (req, res) => {
  const { email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { email },
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

module.exports = router;
