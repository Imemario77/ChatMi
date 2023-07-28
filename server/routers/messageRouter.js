import express from "express";
import { getMessage, sendMessage } from "../controllers/MessageController.js";
const router = express.Router();

router.get("/getmessage/:chatId", getMessage);
router.post("/sendmessage/", sendMessage);

export default router;
