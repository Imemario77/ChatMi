import "./Auth.css";
import { useState } from "react";
import { register, login } from "../Action/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
function Auth() {
   const dispatch = useDispatch();
   const loading = useSelector((state) => state.authreducer.loading);
   const [error, setError] = useState(false); // handle errors from api call
   const [signup, setSignUp] = useState(false); // change from login to signup
   const [takeInput, setTakeInput] = useState({
      //  users input to send to api
      fname: "",
      lname: "",
      username: "",
      password1: "",
      password2: "",
      user: "",
      email: "",
   });

   function handleTakeInput(event) {
      const { name, value } = event.target;
      setTakeInput((prev) => {
         return {
            ...prev,
            [name]: value,
         };
      });
      setError(false);
   }
   // console.log(takeInput);
   async function onAuthSubmit(e) {
      e.preventDefault();
      dispatch({ type: "AUTH_STARTED" });
      if (signup) {
         // sign up a user
         const data = await register(takeInput);
         // console.log(data);
         if (data) {
            if (data.data.message) {
               setError(data.data.message);
               dispatch({ type: "AUTH_FAILED" });
            } else {
               dispatch({ type: "AUTH_FINISHED", data: data.data.result });
               console.log("success");
            }
         }
      } else {
         // login a user
         const data = await login(takeInput);
         if (data) {
            if (data.data.message) {
               setError(data.data.message);
               dispatch({ type: "AUTH_FAILED" });
            } else {
               dispatch({ type: "AUTH_FINISHED", data: data.data.result });
               console.log("success");
            }
         }
      }
   }
   return (
      <div className="Authenticate">
         <form onSubmit={onAuthSubmit}>
            <div className="authForm">
               {error && <p>{error}</p>}
               <h1> {signup ? "SignUp" : "Login"}</h1>
               <div className="input-form">
                  {signup && (
                     <>
                        <div className="form-input">
                           <label>First Name</label>
                           <input
                              value={takeInput.fname}
                              onChange={handleTakeInput}
                              name="fname"
                              placeholder="first name"
                              type="text"
                           />
                        </div>
                        <div className="form-input">
                           <label>Last Name</label>
                           <input
                              value={takeInput.lname}
                              onChange={handleTakeInput}
                              name="lname"
                              placeholder="last name"
                              type="text"
                           />
                        </div>
                        <div className="form-input">
                           <label>User Name</label>
                           <input
                              value={takeInput.username}
                              onChange={handleTakeInput}
                              name="username"
                              placeholder="user name"
                              type="text"
                           />
                        </div>
                        <div className="form-input">
                           <label>Email</label>
                           <input
                              value={takeInput.email}
                              onChange={handleTakeInput}
                              name="email"
                              placeholder="email"
                              type="email"
                           />
                        </div>{" "}
                     </>
                  )}
                  {!signup && (
                     <div className="form-input">
                        <label>User </label>
                        <input
                           value={takeInput.user}
                           onChange={handleTakeInput}
                           name="user"
                           placeholder="user name or email"
                           type="text"
                        />
                     </div>
                  )}
                  <div className="form-input">
                     <label>Password</label>
                     <input
                        value={takeInput.password1}
                        onChange={handleTakeInput}
                        name="password1"
                        placeholder="password"
                        type="password"
                     />
                  </div>
                  {signup && (
                     <div className="form-input">
                        <label>Confirm Password</label>
                        <input
                           value={takeInput.password2}
                           onChange={handleTakeInput}
                           name="password2"
                           placeholder="confirm password"
                           type="password"
                        />
                     </div>
                  )}
                  <span
                     onClick={() => {
                        setSignUp((prev) => {
                           return !prev;
                        });
                        setTakeInput({
                           // reset the user input field
                           fname: "",
                           lname: "",
                           username: "",
                           password1: "",
                           password2: "",
                           user: "",
                           email: "",
                        });
                        setError(false);
                     }}
                     className="haveaccount"
                  >
                     Click here:{" "}
                     {signup
                        ? " Already have an account"
                        : " create an account"}
                  </span>
                  <button className="Authbutton" disabled={loading}>
                     {signup ? "Signup" : "Login"}
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default Auth;
