"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getLeads = void 0;
const db_1 = __importDefault(require("../config/db"));
const getLeads = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`
      SELECT 
        leads.*,
        users.name AS assigned_salesperson
      FROM leads
      LEFT JOIN users
      ON leads.assigned_user_id = users.id
      ORDER BY leads.created_at DESC
    `);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch leads", error });
    }
};
exports.getLeads = getLeads;
const getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db_1.default.query(`
      SELECT 
        leads.*,
        users.name AS assigned_salesperson
      FROM leads
      LEFT JOIN users
      ON leads.assigned_user_id = users.id
      WHERE leads.id = ?
      `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch lead", error });
    }
};
exports.getLeadById = getLeadById;
const createLead = async (req, res) => {
    try {
        const { lead_name, company_name, email, phone, lead_source, assigned_user_id, status, estimated_value, } = req.body;
        await db_1.default.query(`
      INSERT INTO leads
      (
        lead_name,
        company_name,
        email,
        phone,
        lead_source,
        assigned_user_id,
        status,
        estimated_value
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
            lead_name,
            company_name,
            email,
            phone,
            lead_source,
            assigned_user_id,
            status,
            estimated_value,
        ]);
        res.status(201).json({ message: "Lead created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create lead", error });
    }
};
exports.createLead = createLead;
const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { lead_name, company_name, email, phone, lead_source, assigned_user_id, status, estimated_value, } = req.body;
        await db_1.default.query(`
      UPDATE leads
      SET
        lead_name = ?,
        company_name = ?,
        email = ?,
        phone = ?,
        lead_source = ?,
        assigned_user_id = ?,
        status = ?,
        estimated_value = ?
      WHERE id = ?
      `, [
            lead_name,
            company_name,
            email,
            phone,
            lead_source,
            assigned_user_id,
            status,
            estimated_value,
            id,
        ]);
        res.json({ message: "Lead updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update lead", error });
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.query("DELETE FROM leads WHERE id = ?", [id]);
        res.json({ message: "Lead deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete lead", error });
    }
};
exports.deleteLead = deleteLead;
