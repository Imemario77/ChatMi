import { useState, useEffect, useRef } from "react";
import "./AllChats.css";
import { useSelector } from "react-redux";
import Image from "../images/Image";
import { format } from "timeago.js";
import { getMessage } from "../Action/getMessagesAction.js";

function AllGroup({ groupsinfo, newGroupMessage }) {
   const user = useSelector((state) => state.authreducer.authData);
   const [lastMessage, setLastMessage] = useState("");
   useEffect(() => {
      async function getLastMessage() {
         try {
            const { result } = await getMessage(groupsinfo._id);
            setLastMessage(result[result.length - 1]);
         } catch (e) {
            console.log(e);
         }
      }
      getLastMessage();
   }, [groupsinfo]);

   // console.log(groupsinfo._id);
   console.log(newGroupMessage);
   useEffect(() => {
      if (newGroupMessage.reciverId === groupsinfo._id) {
         setLastMessage(newGroupMessage);
      }
   });

   return (
      <div className="AllChats">
         <div className="chatOnline">
            <Image class="chatImage" />
         </div>
         <a
            className="chatLink"
            href={groupsinfo && `/GroupChat/${groupsinfo._id}`}
         >
            <div className="ChatName">
               <span className="chat-Name">
                  {groupsinfo ? groupsinfo.subject : "loading user..."}
               </span>
               <span className={lastMessage &&
                     lastMessage.newMessage !== undefined
                        ? "socketLastMessage"
                        : "lastMessage"
                  }>
                  {!lastMessage
                     ? groupsinfo
                        ? `This group was created ${format(
                             groupsinfo.createdAt
                          )}`
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

export default AllGroup;
