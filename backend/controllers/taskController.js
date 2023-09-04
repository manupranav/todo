const taskModel = require("../models/taskModel");

module.exports.getUserTasks = async (req, res) => {
  const userId = req.headers["x-user-id"]; // Access userID from the custom header
  try {
    const tasks = await taskModel.find({ owner: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const { title, description, complete, owner } = req.body;
    const newTask = await taskModel.create({
      title,
      description,
      complete,
      owner,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { _id, title, description, complete, owner } = req.body;
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id, owner },
      { title, description, complete },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found or unauthorized" });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(400).json({ error: "Error updating task" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { _id, owner } = req.body;
    const deletedTask = await taskModel.findOneAndDelete({
      _id,
      owner,
    });
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found or unauthorized" });
    } else {
      res.json(deletedTask);
    }
  } catch (error) {
    res.status(400).json({ error: "Error deleting task" });
  }
};
