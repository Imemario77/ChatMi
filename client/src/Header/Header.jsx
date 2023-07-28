import "./Header.css";
import Image from "../images/Image";
import { GoThreeBars } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
function Heading(props) {
   const user = props.user;
   const [opened, setOpened] = useState(false);

   return (
      <div className="Heading">
         {" "}
         {opened && (
            <div className="hiddenPage">
               {" "}
               <span
                  style={{
                     position: "absolute",
                     right: "15px",
                     top: "5px",
                     fontSize: "0.8rem",
                     fontWeight: "100",
                  }}
               >
                  {" "}
                  <FaTimes
                     onClick={() => {
                        setOpened(false);
                     }}
                  />
               </span>
               <ul className="listSection">
                  <li className="singlesection">
                     <a href={`/CreateGroup/${user._id}`}>Create group</a>
                  </li>
                  <li className="singlesection">
                     <a href="">Stared messages</a>
                  </li>
                  <li className="singlesection">
                     <a href="">Close friends</a>
                  </li>
                  <li className="singlesection">
                     <a href="/Settings">Settings</a>
                  </li>
               </ul>
            </div>
         )}
         <div className="Heaing-parts">
            <GoThreeBars
               className="heading-icons"
               onClick={() => {
                  setOpened(true);
               }}
            />
            <div>
               <div className="HeadingName"> chatMi</div>
               <span className="userName">{user.userName}</span>
            </div>
         </div>
         <div className="Heaing-parts">
            <IoIosSearch className="heading-icons" />
            <Image class="image" />
         </div>
      </div>
   );
}

export default Heading;
