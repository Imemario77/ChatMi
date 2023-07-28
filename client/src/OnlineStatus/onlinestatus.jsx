import OnlineImage from "../images/Image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { findSpecificUsers } from "../Action/getUserAction.js";
import { GoPrimitiveDot } from "react-icons/go";
import "./OnlineStatus.css";
function OnlineStatus({ usersChat, onlineUser }) {
   const user = useSelector((state) => state.authreducer.authData);
   const [reciverid, setReciverid] = useState("");
   const [reciverData, setReciverData] = useState("");
   const [online, setOnline] = useState(false);

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
      if (onlineUser) {
         if (onlineUser.some((user) => user.userId === reciverData._id)) {
            setOnline(true);
         } else {
            setOnline(false);
         }
      }
   }, [onlineUser]);
   return (
      <>
         {online && (
            <a className='dotlink' href={`/Chatroom/${reciverData._id}`}>
               <div className="onlineUsers">
                  <OnlineImage class="image" />
                  <span>
                     {reciverData ? reciverData.userName : "loading..."}{" "}
                  </span>
                  <GoPrimitiveDot className="dot" />
               </div>
            </a>
         )}
      </>
   );
}

export default OnlineStatus;
