import "./chatBox.css";
import Image from "../images/Image";
import { BiLeftArrowAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getMessage } from "../Action/getMessagesAction.js";
import { sendMessage } from "../Action/sendMessageAction.js";
import { format } from "timeago.js";
import EmojiPicker from "emoji-picker-react";

function GroupChatBox({ groupsinfo }) {
   const [text, setText] = useState("");
   const [mainGroup, setMainGroup] = useState({});
   const { GroupId } = useParams();
   const [message, setMessage] = useState([]);
   const [notifycount, setNotifyCount] = useState(0);
   const user = useSelector((state) => state.authreducer.authData);
   const socket = useRef();
   const scroll = useRef();

   useEffect(() => {
      setMainGroup(
         groupsinfo.filter((group) => {
            return group._id === GroupId;
         })
      );
   }, [groupsinfo]);
   useEffect(() => {
      async function getMessages() {
         try {
            const { result } = await getMessage(GroupId);
            setMessage(result);
         } catch (e) {
            console.log(e);
            // dispatch({ type: "GETMESSAGES_FAILED" });
         }
      }
      getMessages();
   }, [mainGroup]);

   useEffect(() => {
      socket.current = io("http://192.168.16.68:5000");
      socket.current.emit("joinChat", user._id);
   }, [user._id]);
   useEffect(() => {
      socket.current.emit("joinGroupChat", GroupId);
   }, [mainGroup]);

   useEffect(() => {
      socket.current.on("reciveMessage", (message) => {
         if (message.reciverId !== GroupId) {
            // call notification
            setNotifyCount((prev) => {
               return prev + 1;
            });
         } else {
            setMessage((prev) => {
               return [
                  ...prev,
                  {
                     senderName: message.senderName,
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
         socket.current.emit(
            "sendMessage",
            {
               message: text,
               reciverId: GroupId,
               senderId: user._id,
               senderName: user.userName,
               newMessage: true,
               createdAt: new Date(),
               isGroup: true,
            },
            GroupId
         );
         try {
            sendMessage({
               message: text,
               senderId: user._id,
               chatId: GroupId,
               senderName: user.userName,
            });
            setMessage((prev) => {
               return [
                  ...prev,
                  {
                     message: text,
                     senderId: user._id,
                     reciverId: mainGroup._id,
                     senderName: user.userName,
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
            <span
               style={{ fontSize: "1.3rem", top: "-0.2rem" }}
               className="ChatBoxName"
            >
               {mainGroup.length > 0 ? mainGroup[0].subject : "loading.."}
            </span>
            <span
               style={{ fontSize: "0.8rem", top: "1.4rem" }}
               className="ChatBoxName"
            >
               tap here for group info
            </span>
            <span className="notifybellholder">
               <FaBell className="notifybell" />
               {notifycount > 0 && <p className="notifycount">{notifycount}</p>}
            </span>
         </div>
         <div className="enptyspace"></div>
         {message.map((data) => {
            return (
               <div
                  ref={scroll}
                  className={user._id === data.senderId ? "sender" : "reciver"}
               >
                  {user._id !== data.senderId && (
                     <span style={{ fontSize: "7px", margin: "0" }}>
                        {data.senderName}
                     </span>
                  )}
                  <span>{data.message}</span>
                  <span className="senderChatBoxTime">
                     {format(data.createdAt)}
                  </span>
               </div>
            );
         })}
         <div className="ChatBoxSendmessage">
            <input
               className="InputEmoji"
               value={text}
               onChange={(e) => {
                  setText(e.target.value);
               }}
            />{" "}
            <button onClick={handleChatBoxSend} className="ChatBoxSendButton">
               <RiSendPlaneFill className="sendmessagePlane" />
            </button>
         </div>
      </div>
   );
}

export default GroupChatBox;
