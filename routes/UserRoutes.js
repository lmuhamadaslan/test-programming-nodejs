import express from "express";
import { register, login, getAllUsers } from "../controllers/UserControllers.js";
import {verifyToken} from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getAllUsers);

export default router;
