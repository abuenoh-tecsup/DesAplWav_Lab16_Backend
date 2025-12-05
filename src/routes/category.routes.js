// routes/category.routes.js
import express from "express";
import categoryController from "../controllers/category.controller.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", authenticate, categoryController.getAll);
router.get("/:id", authenticate, categoryController.getById);

router.post("/", authenticate, authorize(["ADMIN"]), categoryController.create);
router.patch("/:id", authenticate, authorize(["ADMIN"]), categoryController.update);
router.delete("/:id", authenticate, authorize(["ADMIN"]), categoryController.delete);

export default router;
