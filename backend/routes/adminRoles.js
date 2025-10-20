const router = require("express").Router();
const { auth } = require("../firebase-config");
const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");
const User = require("../models/User");

router.post("/grant-role", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const { uid, role } = req.body; // "admin" or "student"
    if (!uid || !["admin", "student"].includes(role)) {
      return res.status(400).json({ error: "Bad payload" });
    }

    await auth.setCustomUserClaims(uid, { role });
    await User.findByIdAndUpdate(uid, { role });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
