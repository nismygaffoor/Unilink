const { auth } = require("../firebase-config");

/** Middleware: Verify Firebase ID token */
module.exports = async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    const idToken = header.split(" ")[1];
    const decoded = await auth.verifyIdToken(idToken);

    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      name: decoded.name || null,
          role: decoded.role || decoded?.claims?.role, // may be undefined for now
      claims: decoded,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
