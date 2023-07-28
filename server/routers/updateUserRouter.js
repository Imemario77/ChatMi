import express from "express";
import * as update from "../controllers/updateUserController.js";
const router = express.Router();

// route for all update user  POST method
router.post("/names", update.updateUserNames);
router.post("/image", update.AddImage);
router.post("/country", update.country);
router.post("/phoneNumber", update.phoneNumber);
router.post("/staredusers", update.staredUsers);
router.post("/blockedUsers", update.blockedUsers);
router.post("/muted", update.mutedUsers);
router.post("/archived", update.archiveChats);
router.post("/AboutMe", update.AboutMe);
router.post("/password", update.password);
router.post("/email", update.email);
router.post("/address", update.AddAddress);

export default router;
