import Message from "../database/message.js";

export const getMessage = async (req, res) => {
   console.log("result");
   console.log(req.params.chatId);
   try {
      const found = await Message.find();
      const result = found.filter((data) => {
         return data.chatId === req.params.chatId;
      });
      console.log(result);
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const sendMessage = async (req, res) => {
   const message = new Message({
      message: req.body.message,
      senderId: req.body.senderId,
      chatId: req.body.chatId,
      senderName: req.body.senderName
   });

   try {
      const result = await message.save();
      res.json({ result });
      console.log(result);
   } catch (e) {
      console.log(e);
      res.json({ e });
   }
};
