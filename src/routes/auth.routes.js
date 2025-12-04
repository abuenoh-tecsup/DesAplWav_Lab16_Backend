import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);

export default router;
