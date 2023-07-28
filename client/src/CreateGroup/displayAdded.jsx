import Image from "../images/Image";
import { useState, useEffect } from "react";
import { findSpecificUsers } from "../Action/getUserAction.js";
import { AiFillCloseCircle } from "react-icons/ai";
function DisplayParticipant({ id, chosenParticipant, setChosenParticipant, allowDelete }) {
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

   return (
      <div className="displayAddedGroupParticipant">
         <Image class="image" />

         {allowDelete && (
            <AiFillCloseCircle
               onClick={() => {
                  if (chosenParticipant) {
                     if (chosenParticipant.includes(id)) {
                        setChosenParticipant((prev) => {
                           return prev.filter((Previd) => Previd !== id);
                        });
                     }
                  }
               }}
               className="removeParticipant"
            />
         )}

         <span>{user ? user.userName.slice(0, 8) : "loading..."}</span>
      </div>
   );
}

export default DisplayParticipant;
