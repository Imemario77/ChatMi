import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
   {senderName: String,
      message: {
         type: String,
         required: true,
      },
      senderId: {
         type: String,
         required: true,
      },
      chatId: {
         type: String,
         required: true,
      },
      
   },
   {
      timestamps: true,
   }
);

const Message = new mongoose.model("message", messageSchema);

export default Message;
