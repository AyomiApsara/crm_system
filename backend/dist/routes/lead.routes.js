"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lead_controller_1 = require("../controllers/lead.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.protect, lead_controller_1.getLeads);
router.get("/:id", auth_middleware_1.protect, lead_controller_1.getLeadById);
router.post("/", auth_middleware_1.protect, lead_controller_1.createLead);
router.put("/:id", auth_middleware_1.protect, lead_controller_1.updateLead);
router.delete("/:id", auth_middleware_1.protect, lead_controller_1.deleteLead);
exports.default = router;
