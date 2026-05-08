import { Request, Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";

    const query = isAdmin
      ? `
      SELECT 
        leads.*,
        users.name AS assigned_salesperson
      FROM leads
      LEFT JOIN users
      ON leads.assigned_user_id = users.id
      ORDER BY leads.created_at DESC
    `
      : `
      SELECT 
        leads.*,
        users.name AS assigned_salesperson
      FROM leads
      LEFT JOIN users
      ON leads.assigned_user_id = users.id
      WHERE leads.assigned_user_id = ?
      ORDER BY leads.created_at DESC
    `;

    const [rows] = isAdmin
      ? await pool.query(query)
      : await pool.query(query, [req.user?.id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
};

export const getLeadById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isAdmin = req.user?.role === "admin";

    const [rows]: any = await pool.query(
      `
      SELECT 
        leads.*,
        users.name AS assigned_salesperson
      FROM leads
      LEFT JOIN users
      ON leads.assigned_user_id = users.id
      WHERE leads.id = ? ${isAdmin ? "" : "AND leads.assigned_user_id = ?"}
      `,
      isAdmin ? [id] : [id, req.user?.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lead", error });
  }
};

export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const {
      lead_name,
      company_name,
      email,
      phone,
      lead_source,
      assigned_user_id,
      status,
      estimated_value,
    } = req.body;

    const assignedUserId = req.user?.role === "admin" ? assigned_user_id : req.user?.id;

    await pool.query(
      `
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
      `,
      [
        lead_name,
        company_name,
        email,
        phone,
        lead_source,
        assignedUserId,
        status,
        estimated_value,
      ]
    );

    res.status(201).json({ message: "Lead created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create lead", error });
  }
};

export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const {
      lead_name,
      company_name,
      email,
      phone,
      lead_source,
      assigned_user_id,
      status,
      estimated_value,
    } = req.body;

    const isAdmin = req.user?.role === "admin";

    if (!isAdmin) {
      const [leadRows]: any = await pool.query(
        "SELECT assigned_user_id FROM leads WHERE id = ?",
        [id]
      );

      if (leadRows.length === 0) {
        return res.status(404).json({ message: "Lead not found" });
      }

      if (Number(leadRows[0].assigned_user_id) !== req.user?.id) {
        return res.status(403).json({ message: "Forbidden: cannot modify another salesperson's lead" });
      }
    }

    const assignedUserId = isAdmin ? assigned_user_id : req.user?.id;

    await pool.query(
      `
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
      `,
      [
        lead_name,
        company_name,
        email,
        phone,
        lead_source,
        assignedUserId,
        status,
        estimated_value,
        id,
      ]
    );

    res.json({ message: "Lead updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update lead", error });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (req.user?.role !== "admin") {
      const [leadRows]: any = await pool.query(
        "SELECT assigned_user_id FROM leads WHERE id = ?",
        [id]
      );

      if (leadRows.length === 0) {
        return res.status(404).json({ message: "Lead not found" });
      }

      if (Number(leadRows[0].assigned_user_id) !== req.user?.id) {
        return res.status(403).json({ message: "Forbidden: cannot delete another salesperson's lead" });
      }
    }

    await pool.query("DELETE FROM leads WHERE id = ?", [id]);

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lead", error });
  }
};