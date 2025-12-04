// src/models/Message.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Ticket from "./Ticket.js";
import User from "./User.js";

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: true,
  }
);

// Relaciones
Message.belongsTo(Ticket, { foreignKey: "ticketId" });
Ticket.hasMany(Message, { foreignKey: "ticketId" });

Message.belongsTo(User, { as: "author", foreignKey: "authorId" });
User.hasMany(Message, { foreignKey: "authorId" });

export default Message;
