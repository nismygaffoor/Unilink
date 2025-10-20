module.exports = function requireRole(...allowed) {
  return (req, res, next) => {
    const role = req.user?.role || req.user?.claims?.role;
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
