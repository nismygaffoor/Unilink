const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
};

exports.dashboard = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Not admin');
    res.json({ message: 'Welcome to the admin dashboard!' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
