import { Request, Response } from "express";
import pool from "../config/db";

export const getNotesByLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
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
      `,
      [id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes", error });
  }
};

export const createNote = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    await pool.query(
      "INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)",
      [id, content, req.user.id]
    );

    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add note", error });
  }
};