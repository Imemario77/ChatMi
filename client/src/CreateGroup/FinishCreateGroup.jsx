import { BiLeftArrowAlt } from "react-icons/bi";
import Image from "../images/Image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DisplayParticipant from "./displayAdded";
import { HiUserGroup } from "react-icons/hi";
import { createGroupChat } from "../Action/ChatAction.js";
import { Navigate } from "react-router-dom";

function FinishGroup({ setFinishGroup, chosenParticipant }) {
   const [subject, setSubject] = useState("");
   const [success, setSuccess] = useState(false);
   const user = useSelector((state) => state.authreducer.authData);
   const CreateGroupdata = useSelector((state) => state.groupreducer.groupData);
   const dispatch = useDispatch();
   console.log(CreateGroupdata);
   async function CreateGroup() {
      if (subject) {
         const groupInfo = {
            admin: [user._id],
            members: chosenParticipant,
            subject,
         };
         try {
            dispatch({ type: "GROUP_STARTED" });
            const { data } = await createGroupChat(groupInfo);
            console.log(data.result.admin);
            if (data.result.admin.length > 0) {
               dispatch({ type: "GROUP_FINISHED", data: data.result });
               setSuccess(true);
            } else {
               dispatch({ type: "GROUP_FAILED" });
               alert("Could not create group ");
            }
         } catch (e) {
            console.log(e);
         }
      } else {
         alert("Must add a Group subject");
      }
   }
   return (
      <div className="AddChat">
         <div className="back-search">
            <BiLeftArrowAlt
               onClick={() => setFinishGroup(false)}
               className="AddChatArrow"
            />
            <div className="NewGroup">
               <div className="NewGroupChildHolder">
                  <div className="NewGroupChild">
                     <span>New Group</span>
                  </div>
                  <div className="NewGroupChild">
                     <span className="CreateGroupAddParticipant">
                        Add group subject
                     </span>
                  </div>
               </div>
            </div>
         </div>
           {success && <Navigate replace to="/" />}
         <div className="GroupImageTextHolder">
            <Image class="GroupImage" />
            <input
               type="text"
               placeholder="Enter group subject here...."
               onChange={(e) => setSubject(e.target.value)}
               value={subject}
            />
         </div>
         <div
            style={{
               fontSize: "15px",
               margin: "140px 15px 20px",
               position: "fixed",
               zIndex: "1",
               backgroundColor: "white",
               height: "30px",
               width: "100%",
               paddingTop: "20px",
            }}
         >
            <span style={{ margin: "150px 0 0" }}>
               {" "}
               Participant: {chosenParticipant.length}
            </span>{" "}
         </div>
         <div className="showParticipant">
            {chosenParticipant &&
               chosenParticipant.map((id) => {
                  return (
                     <div className="DisplayParticipantMapHolder">
                        <DisplayParticipant
                           id={id}
                           chosenParticipant={chosenParticipant}
                        />
                     </div>
                  );
               })}
         </div>
         <div onClick={CreateGroup} className="addChat">
            {" "}
            <HiUserGroup className="addChat-icon" />
         </div>
      </div>
   );
}

export default FinishGroup;
