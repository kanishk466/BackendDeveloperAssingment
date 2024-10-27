import Task from "../models/Task.js";
import User from "../models/User.js"
import sendTaskAssignmentEmail from "../services/notificationService.js"

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user.id,
    });
    console.log(newTask);
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task', details: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'user') {
      // Users can only view their assigned tasks
      tasks = await Task.find({ assignedTo: req.user.id });
    } else {
      // Admin and Manager can view all tasks
      tasks = await Task.find();
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      createdBy: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
// assign task
const assignTask = async (req, res) => {
  const { taskId, userId } = req.body;
  try {

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.assignedTo = userId;
    await task.save();



    const user = await User.findById(userId);
        const taskDetails = {
          title:task.title,
          description:task.description
        }

    console.log("user :" , user);
    if(user){
      await sendTaskAssignmentEmail(user.email , taskDetails);
    }
    
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error assigning task" });
  }
};

export { createTask, getTasks, assignTask, deleteTask, updateTask };
