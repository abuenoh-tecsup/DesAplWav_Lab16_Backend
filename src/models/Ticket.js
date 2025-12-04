// src/models/Ticket.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Category from "./Category.js";

export const TICKET_STATUS = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
export const PRIORITY = ["LOW", "MEDIUM", "HIGH"];

class Ticket extends Model {}

Ticket.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...TICKET_STATUS),
      defaultValue: "OPEN",
    },
    priority: {
      type: DataTypes.ENUM(...PRIORITY),
      defaultValue: "MEDIUM",
    },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
  }
);

// Relaciones
Ticket.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Ticket, { foreignKey: "categoryId" });

Ticket.belongsTo(User, { as: "user", foreignKey: "userId" });       // creador
User.hasMany(Ticket, { as: "tickets", foreignKey: "userId" });

Ticket.belongsTo(User, { as: "agent", foreignKey: "agentId" });     // asignado
User.hasMany(Ticket, { as: "assignedTickets", foreignKey: "agentId" });

export default Ticket;
