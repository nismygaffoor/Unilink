// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Routes

const subjectRoutes = require('../routes/subjectRoutes');
const noteRoutes = require('../routes/noteRoutes');

const eventRoutes = require('../routes/eventRoutes');
const forumRoutes = require('../routes/forumRoutes');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require("../routes/authRoutes"); // include .js if needed


const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('UniLink Firebase backend is running!');
});

// Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use routes
app.use('/api/auth', authRoutes);      // Signup
// app.use('/api/users', userRoutes);     // Leaderboard & profiles
app.use('/api/subjects', subjectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/events', eventRoutes);   // Events CRUD
app.use('/api/forum', forumRoutes);    // Forum CRUD
// backend/src/index.js (or your main server file)
const path = require("path");

// Serve uploaded files so frontend can access them
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", (req, res, next) => {
  console.log("users route hit:", req.method, req.url);
  next();
}, userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});