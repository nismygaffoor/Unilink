const { auth } = require("../firebase-config");
const User = require("../models/User");

exports.ensureProfile = async (req, res) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }
    const idToken = header.split(" ")[1];
    const decoded = await auth.verifyIdToken(idToken);

    const uid = decoded.uid;
    const email = decoded.email || "";
    const name = decoded.name || req.body?.name || "Anonymous";
    const role = decoded.role || decoded.claims?.role || "student";

    let user = await User.findById(uid);
    if (!user) {
      user = new User({
        _id: uid,
        name,
        email,
        role,
        points: 0,
        badge: "🎓 Newcomer",
        notes: 0,
        events: 0,
        forumPosts: 0,
      });
      await user.save();
    } else if (user.role !== role) {
      user.role = role;
      await user.save();
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to ensure profile" });
  }
};
