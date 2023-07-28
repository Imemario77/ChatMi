import express from "express";
import { getAllUsers, getUser } from "../controllers/getAllUsers.js";
const router = express.Router();

router.get("/findusers/:search", getAllUsers);
router.get("/findSpecificUsers/:search", getUser);
export default router;
