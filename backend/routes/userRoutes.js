const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getMe,
  updateMe,
  getByUid,
  getLeaderboard,
} = require("../controllers/userController");

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateMe);
router.get("/:uid", getByUid); // optional

module.exports = router;
