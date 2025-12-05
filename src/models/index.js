import sequelize from "../db.js";
import User from "./User.js";
import Ticket from "./Ticket.js";
import Message from "./Message.js";
import Category from "./Category.js";

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a DB correcta");
    
    await sequelize.sync(); // crea tablas según los modelos
    console.log("Tablas sincronizadas");
  } catch (error) {
    console.error("Error DB:", error);
  }
};

export { sequelize, User, Ticket, Message, Category, syncDB };
