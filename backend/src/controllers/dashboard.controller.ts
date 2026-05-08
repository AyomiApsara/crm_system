import { Request, Response } from "express";
import pool from "../config/db";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [totalLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads"
    );

    const [newLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'New'"
    );

    const [contactedLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'Contacted'"
    );

    const [qualifiedLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'Qualified'"
    );

    const [proposalSentLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'Proposal Sent'"
    );

    const [wonLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'Won'"
    );

    const [lostLeads]: any = await pool.query(
      "SELECT COUNT(*) AS count FROM leads WHERE status = 'Lost'"
    );

    const [totalValue]: any = await pool.query(
      "SELECT SUM(estimated_value) AS total FROM leads"
    );

    const [wonValue]: any = await pool.query(
      "SELECT SUM(estimated_value) AS total FROM leads WHERE status = 'Won'"
    );

    res.json({
      totalLeads: totalLeads[0].count,
      newLeads: newLeads[0].count,
      contactedLeads: contactedLeads[0].count,
      qualifiedLeads: qualifiedLeads[0].count,
      proposalSentLeads: proposalSentLeads[0].count,
      wonLeads: wonLeads[0].count,
      lostLeads: lostLeads[0].count,

      totalEstimatedValue: totalValue[0].total || 0,
      totalWonValue: wonValue[0].total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error,
    });
  }
};