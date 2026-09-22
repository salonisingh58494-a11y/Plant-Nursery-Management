const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

// Update Address
router.put("/address", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.address = req.body.address || user.address;
      await user.save();

      res.json({ message: "Address updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;