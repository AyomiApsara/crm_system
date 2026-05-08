"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const getUsers = async (req, res) => {
    try {
        const [rows] = await db_1.default.query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await db_1.default.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, role || "salesperson"]);
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create user", error });
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
};
exports.deleteUser = deleteUser;
