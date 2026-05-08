import express from "express";
import { getNotesByLead, createNote } from "../controllers/note.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/leads/:id/notes", protect, getNotesByLead);
router.post("/leads/:id/notes", protect, createNote);

export default router;