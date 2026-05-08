import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getDashboardStats } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", protect, getDashboardStats);

export default router;