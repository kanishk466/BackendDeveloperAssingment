import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/profile", auth, getUserProfile);

export default router;
