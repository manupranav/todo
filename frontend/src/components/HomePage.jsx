import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../HomePage.css";
import { getUserId } from "../hooks/getUserId";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  Modal.setAppElement("#root");

  const userId = getUserId();

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://todo-suyj.onrender.com/task", {
        headers: {
          "X-User-ID": userId,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post("https://todo-suyj.onrender.com/task", {
        title: taskTitle,
        description: taskDescription,
        complete: false,
        owner: userId,
      });
      // Clear form fields and fetch updated task list
      setTaskTitle("");
      setTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateButtonClick = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setShowUpdateDialog(true);
  };

  const handleUpdateTask = async () => {
    try {
      if (selectedTask) {
        const response = await axios.put(
          "https://todo-suyj.onrender.com/task",
          {
            _id: selectedTask._id,
            title: updatedTitle,
            description: updatedDescription,
            complete: selectedTask.complete,
            owner: userId,
          }
        );

        // Clear form fields, close the modal, and fetch updated task list
        setUpdatedTitle("");
        setUpdatedDescription("");
        setShowUpdateDialog(false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete("https://todo-suyj.onrender.com/task", {
        data: { _id: taskId, owner: userId }, // Sending _id and userid in the request body
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async (taskId, completeStatus) => {
    try {
      await axios.put(`https://todo-suyj.onrender.com/task`, {
        _id: taskId,
        complete: completeStatus,
        owner: userId,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}> TASK TITLE</h2>
      <form className="task-form">
        <div className="form-group">
          <label>Task Title:</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="button" onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      </form>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`task-item ${task.complete ? "completed-task" : ""}`}
          >
            <div className="task-content">
              <b>{task.title}</b>
              <p className="">{task.description}</p>
            </div>
            <div className="task-buttons">
              <button
                className="update-button"
                onClick={() => handleUpdateButtonClick(task)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
              <button
                onClick={() => handleCompleteTask(task._id, !task.complete)}
              >
                {task.complete ? "Incomplete" : "Complete"}
              </button>
            </div>

            <Modal
              isOpen={showUpdateDialog}
              onRequestClose={() => setShowUpdateDialog(false)}
              contentLabel="Update Task"
              className="modal"
            >
              <div className="modal-content">
                <h3>Update Task</h3>
                {selectedTask && (
                  <div>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="Updated Title"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="Updated Description"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <div className="modal-buttons">
                      <button
                        className="modal-button"
                        onClick={handleUpdateTask}
                      >
                        Update
                      </button>
                      <button
                        className="modal-button"
                        onClick={() => setShowUpdateDialog(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
