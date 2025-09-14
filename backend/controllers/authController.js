const { auth } = require('../firebase-config');
const User = require('../models/User');

// Signup with Firebase + MongoDB profile
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isUniversityEmail(email)) {
      return res.status(400).json({ error: 'Use your university email' });
    }

    // Check if profile exists in MongoDB
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({ email, password, displayName: name });

    // Save user profile in MongoDB
    const userProfile = new User({
      _id: userRecord.uid,
      name,
      email,
      points: 0,
      badge: '🎓 Newcomer',
      notes: 0,
      events: 0,
      forumPosts: 0
    });
    await userProfile.save();

    res.status(201).json({ uid: userRecord.uid, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Utility function: university email check
function isUniversityEmail(email) {
  const domains = ['mrt.ac.lk', 'cmb.ac.lk', 'pdn.ac.lk', 'sliit.lk'];
  const domain = email.split('@')[1]?.toLowerCase();
  return domains.includes(domain);
}
