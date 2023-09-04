const { Router } = require("express");
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const router = Router();

router.get("/task", getUserTasks);
router.post("/task", createTask);
router.put("/task", updateTask);
router.delete("/task", deleteTask);
router.get("/task/:taskId", getTaskById);

module.exports = router;
