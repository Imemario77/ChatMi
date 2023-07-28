import User from "../database/user.js";
import md5 from "md5";

export const register = async (req, res) => {
   const { fname, lname, email, password1, password2, username } = req.body;

   const usernameresult = await User.findOne({ userName: username });
   const emailresult = await User.findOne({ email: email });

   if (emailresult) {
      res.json({ message: "email already in use " });
   } else {
      if (usernameresult) {
         res.json({ message: "username already in use " });
      } else {
         if (password2 === password1) {
            const user = new User({
               userName: username,
               firstName: fname,
               lastName: lname,
               email: email,
               password: md5(password1),
            });
            try {
               const result = await user.save();
               res.json({ result });
            } catch (e) {
               console.log(e);
               res.json({ message: "try again later " });
            }
         } else {
            res.json({ message: "password are not the same " });
         }
      }
   }
};

export const login = async (req, res) => {
   const { user, password1 } = req.body;
   
   try {
      const result = await User.findOne({ userName: user });
      if (result) {
         if (result.password === md5(password1)) {
            res.json({ result });
         } else {
            res.json({ message: "incorect password" });
         }
      } else {
         const result = await User.findOne({ email: user });
         if (result) {
            if (result.password === md5(password1)) {
               res.json({ result });
            } else {
               res.json({ message: "incorect password" });
            }
         } else {
            res.json({ message: "no user found" });
         }
      }
   } catch (e) {
      console.log(e);
      res.json({ message: "Could not load account" });
   }
};
