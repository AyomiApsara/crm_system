import express from "express";

import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);

router.post("/", protect, createLead);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

export default router;