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

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     description: Allows authorized users to create a task.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project report"
 *               description:
 *                 type: string
 *                 example: "Prepare and submit the final project report by next week."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-01"
 *               priority:
 *                 type: string
 *                 example: "High"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "5f50c31b9d1a2c001cb29f4a"
 *                 title:
 *                   type: string
 *                   example: "Complete project report"
 *                 description:
 *                   type: string
 *                   example: "Prepare and submit the final project report by next week."
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-11-01"
 *                 priority:
 *                   type: string
 *                   example: "High"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *       401:
 *         description: Unauthorized, invalid token or insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied"
 */


router.post("/", auth, roleMiddleware("admin", "manager"), createTask);


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     description: Get a list of all tasks.
 *     security:
 *       - bearerAuth: []
 
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "5f50c31b9d1a2c001cb29f4a"
 *                   title:
 *                     type: string
 *                     example: "Complete project report"
 *                   description:
 *                     type: string
 *                     example: "Prepare and submit the final project report by next week."
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-11-01"
 *                   priority:
 *                     type: string
 *                     example: "High"
 *                   status:
 *                     type: string
 *                     example: "Pending"
 *       401:
 *         description: Unauthorized, invalid token
 */

router.get("/", auth, getTasks);



/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     description: Update the details of a specific task by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "5f50c31b9d1a2c001cb29f4a"
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project report - Revised"
 *               status:
 *                 type: string
 *                 example: "In Progress"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "5f50c31b9d1a2c001cb29f4a"
 *                 title:
 *                   type: string
 *                   example: "Complete project report - Revised"
 *                 status:
 *                   type: string
 *                   example: "In Progress"
 *       404:
 *         description: Task not found
 */
router.put("/:taskId", auth, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     description: Delete a specific task by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "5f50c31b9d1a2c001cb29f4a"
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:taskId", auth, deleteTask);

/**
 * @swagger
 * /api/tasks/assign:
 *   put:
 *     summary: Assign a task to a user
 *     tags: [Task Assignment]
 *     description: Allows a manager to assign a task to a user within their team.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "5f50c31b9d1a2c001cb29f4a"
 *               userId:
 *                 type: string
 *                 example: "5f50b2c99c3b2b001cb29e1b"
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                   example: "5f50c31b9d1a2c001cb29f4a"
 *                 assignedTo:
 *                   type: string
 *                   example: "5f50b2c99c3b2b001cb29e1b"
 *                 message:
 *                   type: string
 *                   example: "Task successfully assigned to user"
 *       400:
 *         description: Invalid input, task or user not found
 *       401:
 *         description: Unauthorized access, token required
 *       403:
 *         description: Access denied for non-manager users
 */


router.put("/assign/:taskId", auth, roleMiddleware("manager"), assignTask);











export default router;
