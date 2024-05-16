import express from "express";
import { registerUser,loginUser, logoutUser, forgotPassword,resetPassword } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);

export default router;
