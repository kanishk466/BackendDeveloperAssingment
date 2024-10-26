
import Task from "../models/Task.js";

 const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

 const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

 const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.taskId, createdBy: req.user.id }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

 const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId, createdBy: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

 const assignTask = async (req, res) => {
    try {
      const { userId } = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.taskId, createdBy: req.user.id },
        { assignedTo: userId },
        { new: true }
      );
  
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error assigning task" });
    }
  };
  

  export {createTask , getTasks , assignTask,deleteTask , updateTask}