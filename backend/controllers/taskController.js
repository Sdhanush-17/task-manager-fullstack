const Task = require("../models/Task");


// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const task = await Task.create({
      title: req.body.title,
      user: req.user.id   // VERY IMPORTANT (ties task to user)
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET TASKS
exports.getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user.id
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ DELETE TASK (THE ONE YOU NEED)
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.toggleTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.completed = !task.completed;

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        title: req.body.title
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

