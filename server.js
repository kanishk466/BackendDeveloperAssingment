import express from "express";
import { configDotenv } from "dotenv";
import ConnectDB  from "./src/config/db.js"
import rateLimit from "express-rate-limit";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();
configDotenv();
ConnectDB();
app.use(express.json());

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
app.use("/api/auth/login", loginLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})