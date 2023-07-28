import Image from "../images/Image";
import { useState, useEffect, useRef } from "react";
import "./AllChats.css";
import { findUser } from "../Action/getUserAction.js";
import { useSelector } from "react-redux";
import { GoPrimitiveDot } from "react-icons/go";
import { findSpecificUsers } from "../Action/getUserAction.js";
import { getMessage } from "../Action/getMessagesAction.js";

function AllChats({ usersChat, onlineUser, newMessage }) {
   const user = useSelector((state) => state.authreducer.authData);
   const [reciverid, setReciverid] = useState("");
   const [reciverData, setReciverData] = useState("");
   const [lastMessage, setLastMessage] = useState("");
   const [online, setOnline] = useState(false);
   const socket = useRef();
   let socketNewMessage = useRef(false);
   // console.log(reciverid[0]);

   useEffect(() => {
      const reciverid = usersChat.members.filter((id) => {
         return id !== user._id;
      });
      setReciverid(reciverid);
   }, [usersChat]);

   useEffect(() => {
      async function getReciverData() {
         try {
            const { users } = await findSpecificUsers(reciverid);

            setReciverData(users);
         } catch (e) {
            console.log(e);
         }
      }
      getReciverData();
   }, [reciverid]);

   useEffect(() => {
      async function getLastMessage() {
         try {
            const { result } = await getMessage(usersChat._id);
            setLastMessage(result[result.length - 1]);
         } catch (e) {
            console.log(e);
         }
      }
      getLastMessage();
   }, [reciverData]);

   useEffect(() => {
      if (onlineUser) {
         if (onlineUser.some((user) => user.userId === reciverData._id)) {
            setOnline(true);
         } else {
            setOnline(false);
         }
      }
   }, [onlineUser]);
   useEffect(() => {
      if (newMessage.senderName === reciverData.userName) {
         setLastMessage(newMessage);
      }
   }, [newMessage]);

   return (
      <div className="AllChats">
         <div className="chatOnline">
            <Image class="chatImage" />
            {online && <GoPrimitiveDot className="online" />}
         </div>
         <a
            className="chatLink"
            href={reciverData && `/Chatroom/${reciverData._id}`}
         >
            <div className="ChatName">
               <span className="chat-Name">
                  {reciverData ? reciverData.userName : "loading user..."}
               </span>
               <span
                  className={lastMessage &&
                     lastMessage.newMessage !== undefined
                        ? "socketLastMessage"
                        : "lastMessage"
                  }
               >
                  {!lastMessage
                     ? reciverData
                        ? `You can now chat with ${reciverData.userName}`
                        : "loading..."
                     : lastMessage && lastMessage.message.length >= 10
                     ? lastMessage.message.slice(0, 30) + "..."
                     : lastMessage.message}
               </span>
            </div>
         </a>
      </div>
   );
}

export default AllChats;
