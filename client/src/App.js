import "./App.css";
import Head from "./Header/Header";
import Chats from "./AllChats/AllChat";
import GroupChats from "./AllChats/AllGroup";
import { RiMessage3Fill } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getUsersChats, getGroupChats } from "./Action/getUserAction.js";
import { io } from "socket.io-client";
import OnlineStats from "./OnlineStatus/onlinestatus";
import Image from "./images/Image";
import GroupChatBox from "./chatBox/GroupChatBox";
import { RiUserFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
function App() {
   const user = useSelector((state) => state.authreducer.authData);
   const [chat, setChat] = useState([]);
   const [groupChat, setGroupChat] = useState([]);
   const [onlineUser, setOnlineUser] = useState([]);
   const [newMessage, setNewMessage] = useState("");
   const [newGroupMessage, setNewGroupMessage] = useState("");
   const [open, setOpen] = useState(false);
   const [openHidden, setOpenHidden] = useState(false);
   const [openGroup, setOpenGroup] = useState(false);
   const socket = useRef();

   useEffect(() => {
      // chats that is linked to this account
      async function GetUsersChats() {
         const { data } = await getUsersChats(user._id);
         // setUserChat(data)
         setChat(data.chat);
      }
      GetUsersChats();
   }, [user]);

   useEffect(() => {
      // chats that is linked to this account
      async function GetUsersGroupChats() {
         const { result } = await getGroupChats(user._id);
         console.log(result);
         setGroupChat(result);
      }
      GetUsersGroupChats();
   }, [user]);

   useEffect(() => {
      socket.current = io("http://192.168.16.68:5000");
      socket.current.emit("joinChat", user._id);
      socket.current.emit("joinGroupChat", "allmessages");
   }, [user]);

   useEffect(() => {
      socket.current.on("onlineUser", (user) => {
         setOnlineUser(user);
      });
   }, []);
   useEffect(() => {
      socket.current.on("reciveallMessage", (message) => {
         if (message.isGroup) {
            setNewGroupMessage(message);
         } else {
            setNewMessage(message);
         }
      });
   });
   return (
      <div className="App">
         <Head user={user} />

         <div className="onlineCHATS">
            <div className="openOnlineCHATS">
               <span>{!openGroup ? "Online Chats" : "Groups"}</span>
               {!openGroup && (
                  <span className="openAndCloseOnline">
                     {open ? (
                        <MdKeyboardArrowUp onClick={() => setOpen(false)} />
                     ) : (
                        <MdKeyboardArrowDown onClick={() => setOpen(true)} />
                     )}
                  </span>
               )}
            </div>

            <div
               style={{ display: open ? "flex" : "none" }}
               className="onlineUsersHolder"
            >
               {chat.length > 0 ? (
                  chat.map((usersChats) => {
                     return (
                        <OnlineStats
                           onlineUser={onlineUser}
                           usersChat={usersChats}
                           open={open}
                        />
                     );
                  })
               ) : (
                  <div className="onlineUsers">
                     <Image class="image" />
                     <span>offline</span>
                  </div>
               )}
            </div>
         </div>
         <>
            {!openGroup ? (
               chat.length > 0 ? (
                  chat.map((usersChats) => {
                     return (
                        <Chats
                           onlineUser={onlineUser}
                           usersChat={usersChats}
                           newMessage={newMessage}
                        />
                     );
                  })
               ) : (
                  <div className="centerLoading">Start Chating</div>
               )
            ) : groupChat.length > 0 ? (
               groupChat.map((groupsinfo) => {
                  return (
                     <GroupChats
                        groupsinfo={groupsinfo}
                        newGroupMessage={newGroupMessage}
                     />
                  );
               })
            ) : (
               <div className="centerLoading">loading groups data..... </div>
            )}
         </>
         <div
            onClick={() => {
               setOpenHidden((prev) => !prev);
            }}
            className="addChat"
         >
            {" "}
            {openHidden ? (
               <IoIosClose className="addChat-icon" />
            ) : (
               <IoIosAdd style={{ color: "white" }} className="addChat-icon" />
            )}
         </div>
         {openHidden && (
            <>
               {" "}
               <a href="/AddNewChat">
                  <div
                     style={{ bottom: "27%" }}
                     className="addChat openGroups "
                  >
                     {" "}
                     <RiMessage3Fill className="addChat-icon groupIcon" />
                  </div>
               </a>
               <div
                  onClick={() => {
                     setOpenGroup((prev) => !prev);
                     setOpenHidden(false);
                     setOpen(true);
                  }}
                  className="addChat openGroups"
               >
                  {" "}
                  {openGroup ? (
                     <RiUserFill className="addChat-icon groupIcon" />
                  ) : (
                     <HiUserGroup className="addChat-icon groupIcon" />
                  )}
               </div>
            </>
         )}
      </div>
   );
}

export default App;
