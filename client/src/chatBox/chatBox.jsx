import "./chatBox.css";
// import { messages } from "./message.js";
import Image from "../images/Image";
import { BiLeftArrowAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { findChat } from "../Action/ChatAction.js";
import { getMessage } from "../Action/getMessagesAction.js";
import { sendMessage } from "../Action/sendMessageAction.js";
import { createChat } from "../Action/getUserAction.js";
import { findSpecificUsers } from "../Action/getUserAction.js";
import { format } from "timeago.js";
function ChatBox(props) {
   const dispatch = useDispatch();
   const newChat = useSelector((state) => state.messagereducer.messageData);
   const newChatStatus = useSelector((state) => state.messagereducer.finished);
   const { reciverId } = useParams();
   const [text, setText] = useState("");
   const [typing, setTyping] = useState(false);
   const [message, setMessage] = useState([]);
   const [userChat, setUserChat] = useState("");
   const [reciverData, setReciverData] = useState("");
   const [notifycount, setNotifyCount] = useState(0);
   const userID = props.user._id;
   const user = props.user;
   const socket = useRef();
   const scroll = useRef();
   const ip = "localhost";

   useEffect(() => {
      async function findCurrentChat() {
         const { result } = await findChat(userID, reciverId);
         setUserChat(result);
      }
      findCurrentChat();
   }, [userID]);

   useEffect(() => {
      async function findChatReciver() {
         const { users } = await findSpecificUsers(reciverId);
         setReciverData(users);
      }
      findChatReciver();
   }, [reciverId]);

   useEffect(() => {
      async function getMessages() {
         dispatch({ type: "GETMESSAGES_STARTED" });
         try {
            const { result } = await getMessage(userChat._id);
            setMessage(result);
            dispatch({ type: "GETMESSAGES_ENDED", data: result });
         } catch (e) {
            console.log(e);
            // dispatch({ type: "GETMESSAGES_FAILED" });
         }
      }
      getMessages();
   }, [userChat]);

   useEffect(() => {
      async function createNewChat() {
         if (newChatStatus) {
            if (newChat.length === 0) {
               await createChat({
                  senderid: userID,
                  reciverid: reciverId,
               });
            }
         }
      }
      createNewChat();
   }, [userChat, reciverData]);
   useEffect(() => {
      socket.current = io(`http:/192.168.16.68:5000`);
      socket.current.emit("joinChat", userID);
   }, [userID]);

   useEffect(() => {
      socket.current.on("typing", (message) => {
         setTyping(true);
      });
      socket.current.on("reciveMessage", (message) => {
         console.log(message);
         if (message.senderId !== reciverId) {
            // call notification
            setNotifyCount((prev) => {
               return prev + 1;
            });
         } else {
            setMessage((prev) => {
               return [
                  ...prev,
                  {
                     message: message.message,
                     createdAt: message.createdAt,
                  },
               ];
            });
         }
      });
   }, [socket]);

   function handleChatBoxSend() {
      if (text) {
         socket.current.emit("sendMessage", {
            message: text,
            reciverId: reciverData._id,
            senderId: userID,
            senderName: user.userName,
            newMessage: true,
            createdAt: new Date(),
            isGroup: false,
         });

         try {
            sendMessage({
               message: text,
               senderId: userID,
               chatId: userChat._id,
            });
            setMessage((prev) => {
               return [
                  ...prev,
                  {
                     message: text,
                     senderId: userID,
                     reciverId: reciverId,
                  },
               ];
            });
         } catch (e) {
            console.log(e);
         }
         setText("");
      }
   }
   useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
   }, [message, text]);
   return (
      <div className="chatBox">
         <div className="chatBoxHeader">
            <a href="/">
               <BiLeftArrowAlt className="leftArrow" />
            </a>
            <Image class="chatBoxImage" />
            <span className="ChatBoxName">
               {reciverData ? reciverData.userName : "loading.."}
            </span>
            <span className="notifybellholder">
               <FaBell className="notifybell" />
               {notifycount > 0 && <p className="notifycount">{notifycount}</p>}
            </span>
         </div>
         <div className="enptyspace"></div>
         {message.length === 0 ? (
            <span className="startChat">
               {" "}
               <a href="">Click here to start messaging </a>
            </span>
         ) : (
            message.map((data) => {
               return (
                  <div
                     ref={scroll}
                     className={userID === data.senderId ? "sender" : "reciver"}
                  >
                     <span>{data.message}</span>
                     <span className="senderChatBoxTime">
                        {format(data.createdAt)}
                     </span>
                  </div>
               );
            })
         )}{" "}
         <div className="ChatBoxSendmessage">
            <textarea
               className="InputEmoji"
               value={text}
               onChange={(e) => {
                  setText(e.target.value);

                  socket.current.emit("typing", {
                     reciverId: reciverData._id,
                     senderId: userID,
                  });
               }}
            />
            <button onClick={handleChatBoxSend} className="ChatBoxSendButton">
               <RiSendPlaneFill className="sendmessagePlane" />
            </button>
         </div>
      </div>
   );
}
export default ChatBox;
