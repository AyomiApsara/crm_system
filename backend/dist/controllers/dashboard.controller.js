"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const db_1 = __importDefault(require("../config/db"));
const getDashboardStats = async (req, res) => {
    try {
        const [totalLeads] = await db_1.default.query("SELECT COUNT(*) AS count FROM leads");
        const [newLeads] = await db_1.default.query("SELECT COUNT(*) AS count FROM leads WHERE status = 'New'");
        const [qualifiedLeads] = await db_1.default.query("SELECT COUNT(*) AS count FROM leads WHERE status = 'Qualified'");
        const [wonLeads] = await db_1.default.query("SELECT COUNT(*) AS count FROM leads WHERE status = 'Won'");
        const [lostLeads] = await db_1.default.query("SELECT COUNT(*) AS count FROM leads WHERE status = 'Lost'");
        const [totalValue] = await db_1.default.query("SELECT SUM(estimated_value) AS total FROM leads");
        const [wonValue] = await db_1.default.query("SELECT SUM(estimated_value) AS total FROM leads WHERE status = 'Won'");
        res.json({
            totalLeads: totalLeads[0].count,
            newLeads: newLeads[0].count,
            qualifiedLeads: qualifiedLeads[0].count,
            wonLeads: wonLeads[0].count,
            lostLeads: lostLeads[0].count,
            totalEstimatedValue: totalValue[0].total || 0,
            totalWonValue: wonValue[0].total || 0,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard stats",
            error,
        });
    }
};
exports.getDashboardStats = getDashboardStats;
