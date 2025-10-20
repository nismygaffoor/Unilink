// routes/events.js
const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// List + Create
router.get("/", getEvents);
router.post("/", createEvent);

// Read/Update/Delete by Mongo _id
router.get("/:_id", getEventById);
router.put("/:_id", updateEvent);
router.delete("/:_id", deleteEvent);

module.exports = router;
