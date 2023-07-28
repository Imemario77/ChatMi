import Chat from "../database/chats.js";
import { groupChat } from "../database/chats.js";

// create new chat members
export const createChats = async (req, res) => {
   const result = await Chat.findOne({
      members: { $all: [req.body.senderid, req.body.reciverid] },
   });
   console.log("result: " + result);
   result && console.log(result.length);
   if (!result) {
      try {
         const chat = new Chat({
            members: [req.body.senderid, req.body.reciverid],
         });

         const result = await chat.save();
         res.json({ result });
      } catch (e) {
         res.json({ e });
      }
   } else {
      console.log("already exixted");
   }
};

// get all the users chat members
export const getUserChats = async (req, res) => {
   try {
      //console.log(req.params.userid);
      const chat = await Chat.find({ members: { $in: [req.params.userid] } });
      // console.log(chat);
      res.json({ chat });
   } catch (e) {
      console.log(e);
      res.json({ e });
   }
};

// get individual chats
export const findEachChat = async (req, res) => {
   try {
      const result = await Chat.findOne({
         members: { $all: [req.params.senderid, req.params.reciverid] },
      });
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

// create Group Chat
export const createGroupChats = async (req, res) => {
   console.log("req.body");
   console.log(req.body);
   try {
      const chat = new groupChat({
         image: req.body.image,
         subject: req.body.subject,
         admin: req.body.admin,
         members: req.body.members,
      });

      const result = await chat.save();
      res.json({ result });
      console.log(result);
   } catch (e) {
      res.json({ e });
   }
};

export const getUserGroups = async (req, res) => {
   console.log(req.params);
   try {
      const result = await groupChat.find({
         $or: [
            { members: { $in: [req.params.userId] } },
            { admin: { $in: [req.params.userId] } },
         ],
      });
      console.log(result);
      res.json({ result });
   } catch (e) {
      res.json({e});
   }
};
