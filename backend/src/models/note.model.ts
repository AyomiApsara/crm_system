import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

export class Note extends Model {
  declare id: number;
  declare lead_id: number;
  declare content: string;
  declare created_by: string;
  declare created_at: Date;
}

Note.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    lead_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_by: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "notes",
  }
);

export default Note;
