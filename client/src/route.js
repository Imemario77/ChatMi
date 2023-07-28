import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import App from "./App.js";
import ChatBox from "./chatBox/chatBox";
import GroupChatBox from "./chatBox/GroupChatBox";
import AddChat from "./AddChat/addChat";
import Auth from "./Authentication/Auth";
import Group from "./CreateGroup/Group";
import Settings from "./Settings/settings";
import Profile from "./Profile/profile";
import { getUsersChats, getGroupChats } from "./Action/getUserAction.js";

function AppRoute() {
   const user = useSelector((state) => state.authreducer.authData);
   const [userChat, setUserChat] = useState("");
   const [groupChat, setGroupChat] = useState([]);

   useEffect(() => {
      async function GetUsersChats() {
         const result = await getUsersChats(user._id);
         setUserChat(result.data);
      }
      GetUsersChats();
   }, [user]);

   useEffect(() => {
      // group chats that is linked to this account
      async function GetUsersGroupChats() {
         const { result } = await getGroupChats(user._id);
         setGroupChat(result);
      }
      GetUsersGroupChats();
   }, [user]);

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={user ? <App /> : <Navigate to="Auth" />} />
            <Route
               path="/Chatroom/:reciverId"
               element={
                  user ? <ChatBox user={user} /> : <Navigate to="/Auth" />
               }
            />
            <Route
               path="/AddNewChat"
               element={user ? <AddChat /> : <Navigate to="/Auth" />}
            />
            <Route
               path="/Auth"
               element={user ? <Navigate to="/" /> : <Auth />}
            />
            <Route
               path="/CreateGroup/:admin"
               element={
                  user ? <Group userChat={userChat} /> : <Navigate to="/Auth" />
               }
            />
            <Route
               path="/GroupChat/:GroupId"
               element={
                  user ? (
                     <GroupChatBox groupsinfo={groupChat} />
                  ) : (
                     <Navigate to="/Auth" />
                  )
               }
            />
            <Route
               path="/Settings"
               element={user ? <Settings /> : <Navigate to="/Auth" />}
            />
            <Route
               path="/Profile/:user"
               element={user ? <Profile /> : <Navigate to="/Auth" />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default AppRoute;
