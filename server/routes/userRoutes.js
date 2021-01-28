import express from "express";
import { getAllUsers, getOneUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getOneUser);

export default router;
