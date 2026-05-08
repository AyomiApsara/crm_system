import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export class Lead extends Model {
  declare id: number;
  declare lead_name: string;
  declare company_name: string;
  declare email: string;
  declare phone: string;
  declare lead_source: string;
  declare status: string;
  declare estimated_value: number;
  declare assigned_user_id: number;
  declare created_at: Date;
}

Lead.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    lead_name: { type: DataTypes.STRING(255), allowNull: false },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: true },
    phone: { type: DataTypes.STRING(100), allowNull: true },
    lead_source: { type: DataTypes.STRING(100), allowNull: true },
    status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "New" },
    estimated_value: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    assigned_user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "leads",
  }
);

export default Lead;
