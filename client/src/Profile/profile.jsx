import { BiLeftArrowAlt } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import "./profile.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "../images/Image";
import { Modal, Button, Group } from "@mantine/core";
import UpdateName from "./UpdateNames";
import ResidentInfo from "./ResidentInfo";
import About from "./About";
function Profile() {
   const user = useSelector((state) => state.authreducer.authData);
   const [names, setNames] = useState({
      fname: user.firstName,
      lname: user.lastName,
      username: user.userName,
   });

   const [residentInfo, setResidentInfo] = useState({
      country: user.country,
      address: user.address,
   });
   const [about, setAbout] = useState(user.aboutMe);

   const [openedAddress, setOpenedAddress] = useState(false);
   const [openedAbout, setOpenedAbout] = useState(false);
   const [openedName, setOpenedName] = useState(false);
   return (
      <div className="AddChat">
         <div className="back-search">
            <a href="/">
               <BiLeftArrowAlt className="AddChatArrow" />
            </a>
            <span className="SettingsHeading">Profile</span>
         </div>
         <div className="userProfileHolder">
            <div className="userProfileImageHolder">
               <Image class="userProfileImage" />
               <HiCamera
                  style={{
                     position: "absolute",
                     backgroundColor: "gold",
                     fontSize: "40px",
                     width: " 2rem",
                     height: "2rem",
                     right: "2%",
                     top: "70%",
                     borderRadius: " 50% ",
                     padding: "6px",
                     border: "1px solid gold",
                     color: "ivory",
                  }}
               />
            </div>

            <div className="Profileinfo">
               <FaUserAlt className="ProfileIconsInfo" />
               <div className="mainInfo">
                  <span style={{ fontSize: "10px" }}>Name/Username</span>
                  <span
                     style={{ fontSize: "15px" }}
                  >{`${user.firstName} ${user.lastName}`}</span>
               </div>
               <CiEdit
                  onClick={() => setOpenedName(true)}
                  className="ProfileIconEdit"
               />
            </div>

            <div className="Profileinfo">
               <BsInfoCircle className="ProfileIconsInfo" />
               <div className="mainInfo centerline">
                  <span style={{ fontSize: "10px" }}>About</span>
                  <span style={{ fontSize: "15px" }}>{user.aboutMe}</span>
               </div>
               <CiEdit
                  onClick={() => setOpenedAbout(true)}
                  className="ProfileIconEdit"
               />
            </div>

            <div className="Profileinfo">
               <MdLocationOn className="ProfileIconsInfo" />
               <div className="mainInfo">
                  <span style={{ fontSize: "10px" }}>Address/Country</span>
                  <span style={{ fontSize: "15px" }}>{user.address}</span>
               </div>
               <CiEdit
                  onClick={() => setOpenedAddress(true)}
                  className="ProfileIconEdit"
               />
            </div>
         </div>
         <About
            about={about}
            openedAbout={openedAbout}
            setOpenedAbout={setOpenedAbout}
            setAbout={setAbout}
         />
         <ResidentInfo
            setResidentInfo={setResidentInfo}
            ResidentInfo={ResidentInfo}
            openedAddress={openedAddress}
            setOpenedAddress={setOpenedAddress}
         />
         <UpdateName
            setNames={setNames}
            names={names}
            openedName={openedName}
            setOpenedName={setOpenedName}
         />
      </div>
   );
}

export default Profile;
