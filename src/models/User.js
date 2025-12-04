// src/models/User.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

export const ROLE = ["USER", "AGENT", "ADMIN"];

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM(...ROLE),
      defaultValue: "USER",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);


export default User;
