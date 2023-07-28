import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
   {
      members: {
         type: Array,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);
const groupChatSchema = new mongoose.Schema(
   {
      image: String,
      subject: String,
      admin: {
         type: Array,
         required: true,
      },
      members: {
         type: Array,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Chat = new mongoose.model("chat", chatSchema);
export const groupChat = new mongoose.model("groupchat", groupChatSchema);

export default Chat;
