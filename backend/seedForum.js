const mongoose = require("mongoose");
const ForumPost = require("./models/ForumPost");

const MONGO_URI = "mongodb+srv://nismygaffoor5:nis1234@unilink.bsiqzoq.mongodb.net/unilink?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    // Clear old data
    await ForumPost.deleteMany({});

    // Insert sample posts
    await ForumPost.create([
      {
        author: "Ali",
        content: "How do I prepare for the coding challenge?",
        likes: 5,
        comments: [
          { author: "Sara", content: "Practice LeetCode daily!" },
          { author: "Ravi", content: "Also revise sorting algorithms." }
        ]
      },
      {
        author: "Maya",
        content: "Anyone attending the upcoming workshop?",
        likes: 2,
        comments: [
          { author: "John", content: "Yes, I'm excited to join!" }
        ]
      }
    ]);

    console.log("Seeded forum posts ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
})();
