import { Modal, Button, Group } from "@mantine/core";

function UpdateNames({ names, setNames, openedName, setOpenedName }) {
   return (
      <>
         <Modal
            opened={openedName}
            onClose={() => setOpenedName(false)}
            title="Name/Username"
            overlayBlur="10"
         >
            <div className="modelProfileDisplay">
               <>
                  <label
                     style={{
                        fontSize: "10px",
                        margin: "0",
                        fontWeight: "900",
                     }}
                  >
                     Enter Firstname
                  </label>
                  <input
                     onChange={(e) => {
                        setNames((prev) => {
                           return { ...prev, fname: e.target.value };
                        });
                     }}
                     value={names.fname}
                     className="profileInput"
                     type="text"
                  />
               </>
               <>
                  <label
                     style={{
                        fontSize: "10px",
                        margin: "0",
                        fontWeight: "900",
                     }}
                  >
                     Enter LastName
                  </label>
                  <input
                     onChange={(e) => {
                        setNames((prev) => {
                           return { ...prev, lname: e.target.value };
                        });
                     }}
                     value={names.lname}
                     className="profileInput"
                     type="text"
                  />
               </>
               <>
                  <label
                     style={{
                        fontSize: "10px",
                        margin: "0",
                        fontWeight: "900",
                     }}
                  >
                     Enter Username
                  </label>
                  <input
                     onChange={(e) => {
                        setNames((prev) => {
                           return { ...prev, username: e.target.value };
                        });
                     }}
                     value={names.username}
                     className="profileInput"
                     type="text"
                  />
               </>
               <span className="profileSave">Save</span>
            </div>
         </Modal>
            
      </>
   );
}

export default UpdateNames;
