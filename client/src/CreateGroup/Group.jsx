import { BiLeftArrowAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "../images/Image";
import { findSpecificUsers } from "../Action/getUserAction.js";
import Participant from "./participant";
import DisplayParticipant from "./displayAdded";
import FinishGroup from "./FinishCreateGroup";
import "./Group.css";
import { HiUserGroup } from "react-icons/hi";
function CreateGroup({ userChat }) {
   const [search, setSearch] = useState(false);
   const [searchValue, setSearchValue] = useState(false);
   const [finishGroup, setFinishGroup] = useState(false);
   const [subject, setSubject] = useState("");
   const [chatLength, setChatLength] = useState(0);
   const [chosenParticipant, setChosenParticipant] = useState([]);
   const user = useSelector((state) => state.authreducer.authData);
   const scroll = useRef();

   useEffect(() => {
      scroll.current?.scrollIntoView({
         behavior: "smooth",
         inline: "center",
      });
   }, [chosenParticipant]);
   return (
      <>
         {!finishGroup ? (
            <div className="AddChat">
               {!search ? (
                  <div className="back-search">
                     <a href="/">
                        <BiLeftArrowAlt className="AddChatArrow" />
                     </a>
                     <div className="NewGroup">
                        <div className="NewGroupChildHolder">
                           <div className="NewGroupChild">
                              <span>New Group</span>
                           </div>
                           <div className="NewGroupChild">
                              <span className="CreateGroupAddParticipant">
                                 {chosenParticipant.length > 0
                                    ? chosenParticipant.length +
                                      " of " +
                                      userChat.chat.length +
                                      " selected"
                                    : "Add participants"}
                              </span>
                           </div>
                        </div>
                        <IoIosSearch
                           onClick={() => {
                              setSearch(true);
                           }}
                           className="heading-icons"
                        />
                     </div>
                  </div>
               ) : (
                  <div className="back-search">
                     <BiLeftArrowAlt
                        onClick={() => {
                           setSearch(false);
                        }}
                        className="AddChatArrow"
                     />

                     <input spellcheck="false"
                        type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search...."
                     />
                  </div>
               )}
               <div
                  style={{ marginTop: "70px" }}
                  className={
                     chosenParticipant.length > 0
                        ? "DisplayParticipantHolder"
                        : ""
                  }
               >
                  {chosenParticipant.length > 0 &&
                     chosenParticipant.map((id) => {
                        return (
                           <DisplayParticipant
                              id={id}
                              chosenParticipant={chosenParticipant}
                              setChosenParticipant={setChosenParticipant}
                              allowDelete={true}
                           />
                        );
                     })}
               </div>
               <div
                  style={{
                     borderTop:
                        chosenParticipant.length > 0 ? "0.5px solid black" : "",
                  }}
               >
                  {userChat
                     ? userChat.chat.map((info) => {
                          const reciverid = info.members.filter((id) => {
                             return id !== user._id;
                          });
                        
                          return (
                             <span
                                onClick={() => {
                                   console.log(chosenParticipant);
                                   if (chosenParticipant) {
                                      if (
                                         chosenParticipant.includes(
                                            reciverid[0]
                                         )
                                      ) {
                                         setChosenParticipant((prev) => {
                                            return prev.filter(
                                               (Previd) =>
                                                  Previd !== reciverid[0]
                                            );
                                         });
                                      } else {
                                         setChosenParticipant((prev) => {
                                            return [...prev, reciverid[0]];
                                         });
                                      }
                                   }
                                   console.log(chosenParticipant);
                                }}
                             >
                                {" "}
                                <Participant
                                   id={reciverid}
                                   chosenParticipant={chosenParticipant}
                                   search={searchValue}
                                />{" "}
                             </span>
                          );
                       })
                     : "loading chat"}
               </div>
               <div
                  onClick={() =>
                     chosenParticipant.length > 0
                        ? setFinishGroup(true)
                        : alert("Select at least a user")
                  }
                  className="addChat"
               >
                  {" "}
                  <HiUserGroup className="addChat-icon" />
               </div>
            </div>
         ) : (
            <FinishGroup
               setFinishGroup={setFinishGroup}
               chosenParticipant={chosenParticipant}
            />
         )}
      </>
   );
}

export default CreateGroup;
