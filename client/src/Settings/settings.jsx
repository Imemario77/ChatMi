import "./setting.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { RiAccountBoxFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { useSelector } from "react-redux";
import Image from "../images/Image";

function Setting() {
   const user = useSelector((state) => state.authreducer.authData);

   return (
      <div className="AddChat">
         <div className="back-search">
            <a href="/">
               <BiLeftArrowAlt className="AddChatArrow" />
            </a>
            <span className="SettingsHeading">Settings</span>
         </div>
         <div>
            <a href="/Profile/my-profile">
               <div className="Settingsholder">
                  <Image class="Settingsimage" />
                  <div className="SettingsName">
                     <span className="realName">{`${user.firstName} ${user.lastName}`}</span>
                     <span className="AboutMe">
                        {user.aboutMe}
                     </span>
                  </div>
               </div>
            </a>

            <div className="singleSettingholder">
               <RiAccountBoxFill className="openaccountsetting" />
               <div className="singleSettingholdertext">
                  <span>Accounts</span>
                  <p>Change emails, delete account, change number</p>
               </div>
            </div>
            <div className="singleSettingholder">
               <MdPrivacyTip className="openaccountsetting" />
               <div className="singleSettingholdertext">
                  <span>Privacy</span>
                  <p>Blocked contacts, active status, muted account</p>
               </div>
            </div>
            <div className="singleSettingholder">
               <IoIosChatboxes className="openaccountsetting" />
               <div className="singleSettingholdertext">
                  <span>Chats</span>
                  <p>Clear all chats, delete all chats, archive all chats</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Setting;
