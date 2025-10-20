// backend/controllers/userController.js
const User = require("../models/User");

// GET /api/users/me
exports.getMe = async (req, res) => {
  try {
    // Firebase UID is stored as Mongo _id (string)
    const user = await User.findOne({ _id: req.user.uid });
    if (!user) return res.status(404).json({ error: "Profile not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to load profile" });
  }
};

// PATCH /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const allowed = ["name", "badge"];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

    const user = await User.findOneAndUpdate(
      { _id: req.user.uid },          // <— key fix (use UID as _id)
      updates,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: "Profile not found" });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message || "Update failed" });
  }
};

// (Optional) GET /api/users/:uid — if you still want to view others' public profiles
exports.getByUid = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to load user" });
  }
};

// GET /api/users/leaderboard
exports.getLeaderboard = async (_req, res) => {
  try {
    const top = await User.find().sort({ points: -1 }).limit(50).lean();
    res.json(top);
  } catch {
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
};
