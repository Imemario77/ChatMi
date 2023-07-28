import express from "express";
import {
   createChats,
   getUserChats,
   findEachChat,
   createGroupChats,
   getUserGroups,
} from "../controllers/ChatsController.js";

const router = express.Router();

router.get("/find/:senderid/:reciverid", findEachChat);
router.get("/:userid", getUserChats);
router.post("/", createChats);

// Group chat router
router.post("/CreateGroup", createGroupChats);
router.get("/usersGroup/:userId", getUserGroups);

export default router;
