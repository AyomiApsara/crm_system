"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getNotesByLead = void 0;
const db_1 = __importDefault(require("../config/db"));
const getNotesByLead = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db_1.default.query(`
      SELECT 
        notes.id,
        notes.lead_id,
        notes.content,
        notes.created_at,
        users.name AS created_by
      FROM notes
      LEFT JOIN users
      ON notes.created_by = users.id
      WHERE notes.lead_id = ?
      ORDER BY notes.created_at DESC
      `, [id]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
};
exports.getNotesByLead = getNotesByLead;
const createNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        await db_1.default.query("INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)", [id, content, req.user.id]);
        res.status(201).json({ message: "Note added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add note", error });
    }
};
exports.createNote = createNote;
