import { Modal, Button, Group } from "@mantine/core";
import { aboutMe } from "../Action/updateActions.js";
import { useSelector } from "react-redux";

function About({ about, setAbout, setOpenedAbout, openedAbout }) {
   const user = useSelector((state) => state.authreducer.authData);
   async function handleSave() {
      if (about === "") {
         setAbout(user.aboutMe);
         
         alert("About can not be empty");
      } else {
         try {
            const { result } = await aboutMe({ aboutMe: about });
            result && result.acknowledged === true
               ? alert("Succesfull.....")
               : alert("An error ocured. Try again later");
            setOpenedAbout(false);
         } catch (e) {
            alert(e);
         }
      }
      user.aboutMe = about;
   }
   return (
      <Modal
         opened={openedAbout}
         onClose={() => setOpenedAbout(false)}
         title="About"
      >
         {" "}
         <div className="modelProfileDisplay">
            <>
               <label
                  style={{
                     fontSize: "10px",
                     margin: "0",
                     fontWeight: "900",
                  }}
               >
                  Enter About
               </label>
               <input
                  onChange={(e) => {
                     setAbout(e.target.value);
                  }}
                  value={about}
                  className="profileInput"
                  type="text"
               />
            </>{" "}
            <span onClick={handleSave} className="profileSave">
               Save
            </span>
         </div>
      </Modal>
   );
}

export default About;
