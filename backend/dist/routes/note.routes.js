"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/leads/:id/notes", auth_middleware_1.protect, note_controller_1.getNotesByLead);
router.post("/leads/:id/notes", auth_middleware_1.protect, note_controller_1.createNote);
exports.default = router;
