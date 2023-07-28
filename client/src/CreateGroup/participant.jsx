import Image from "../images/Image";
import { useState, useEffect } from "react";
import { findSpecificUsers } from "../Action/getUserAction.js";
import { GrStatusGood } from "react-icons/gr";
import { HiUserAdd } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
function Participant({ id, chosenParticipant, search }) {
   const [user, setUser] = useState(null);
   const [clicked, setClicked] = useState(false);
   useEffect(() => {
      async function getUsersChatinfo() {
         try {
            const { users } = await findSpecificUsers(id);
            setUser(users);
         } catch (e) {
            console.log(e);
         }
      }
      getUsersChatinfo();
   }, [id]);
   useEffect(() => {
      if (chosenParticipant.includes(id[0])) {
         setClicked(true);
      } else {
         setClicked(false);
      }
   }, [chosenParticipant]);
   return (<>
         {!search ? (
         
      <div className="CreateGroupParticipant">
               <Image class="image" />
               <div className="markedAdduser">
                  {clicked ? (
                     <p className="addParticipantgoodstatus added">
                        <FaUserCheck />
                        Added
                     </p>
                  ) : (
                     <p className="addParticipantgoodstatus">
                        {" "}
                        <HiUserAdd />
                        Add
                     </p>
                  )}
                  <span>{user ? user.userName : "loading..."}</span>
               </div>
            </div>
         ) : user && user.userName.includes(search) ? (
         <div className="CreateGroupParticipant">
               <Image class="image" />
               <div className="markedAdduser">
                  {clicked ? (
                     <p className="addParticipantgoodstatus added">
                        <FaUserCheck />
                        Added
                     </p>
                  ) : (
                     <p className="addParticipantgoodstatus">
                        {" "}
                        <HiUserAdd />
                        Add
                     </p>
                  )}
                  <span>{user ? user.userName : "loading..."}</span>
               </div>
      </div>
            
         ) : null}
      </>
   );
}

export default Participant;
