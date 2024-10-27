import express from "express";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    assignTask,
} from "../controllers/taskController.js";
import auth from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post("/", auth, roleMiddleware("admin", "manager"), createTask);

router.get("/", auth, getTasks);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

router.put("/assign/:taskId", auth, roleMiddleware("manager"), assignTask);

export default router;
