import express from "express";
import { getUsers, createUser, deleteUser } from "../controllers/user.controller";
import { protect, requireAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, requireAdmin, getUsers);
router.post("/", protect, requireAdmin, createUser);
router.delete("/:id", protect, requireAdmin, deleteUser);

export default router;