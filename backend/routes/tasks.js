const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();
const { toggleTask } = require("../controllers/taskController");
const {
  createTask,
  getTasks,
  deleteTask
} = require("../controllers/taskController");
// CREATE task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = await Task.create({
    title,
    description,
    userId: req.userId
  });

  res.status(201).json(task);
});

// GET all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

router.patch("/:id", authMiddleware, toggleTask);
router.put("/:id", authMiddleware, updateTask);

module.exports = router;
