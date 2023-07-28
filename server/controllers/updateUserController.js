import User from "../database/user.js";
import md5 from "md5";
export const updateUserNames = async (req, res) => {
   const usernameresult = await User.findOne({
      userName: req.body.subject.username,
   });
   // check if the update is for the fullname and username
   if (usernameresult) {
      res.json({ message: "username is taken" });
   } else {
      if (
         req.body.subject.fname &&
         req.body.subject.lname &&
         req.body.subject.username
      ) {
         try {
            console.log("cslled");
            const result = await User.updateOne(
               { _id: req.body.subject.id },
               {
                  firstName: req.body.subject.fname,
                  lastName: req.body.subject.lname,
                  userName: req.body.subject.username,
               }
            );
            res.json({ result });
         } catch (e) {
            res.json({ e });
         }
      } else if (
         req.body.subject.fname &&
         req.body.subject.lname &&
         !req.body.subject.username
      ) {
         // check if its only first name & lastName
         console.log("its my turn");
         try {
            const result = await User.updateOne(
               { _id: req.body.subject.id },
               {
                  firstName: req.body.subject.fname,
                  lastName: req.body.subject.lname,
                  userName: req.body.subject.username,
               }
            );
            res.json({ result });
         } catch (e) {}
      } else {
         // update only the userName
         try {
            const result = await User.updateOne(
               { _id: req.body.subject.id },
               {
                  userName: req.body.subject.username,
               }
            );
            res.json({ result });
         } catch (e) {
            res.json({ e });
         }
      }
   }
};

export const AddAddress = async (req, res) => {
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { address: req.body.address }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const archiveChats = async (req, res) => {
   try {
      const user = await User.findById({ _id: req.body.id });
      if (!user.archiveChats.includes(req.body.archiveChats)) {
         const result = await user.updateOne({
            $push: { archiveChats: req.body.archiveChats },
         });
         res.json({ result });
      } else {
         const result = await user.updateOne({
            $pull: { archiveChats: req.body.archiveChats },
         });
         res.json({ result });
      }
   } catch (e) {
      res.json({ e });
   }
};

export const AboutMe = async (req, res) => {
   console.log(req.body)
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { aboutMe: req.body.aboutMe }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const AddImage = async (req, res) => {
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { image: req.body.image }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const staredUsers = async (req, res) => {
   try {
      const user = await User.findById({ _id: req.body.id });
      if (!user.staredUsers.includes(req.body.staredUsers)) {
         const result = await user.updateOne({
            $push: { staredUsers: req.body.staredUsers },
         });
         res.json({ result });
      } else {
         const result = await user.updateOne({
            $pull: { staredUsers: req.body.staredUsers },
         });
         res.json({ result });
      }
   } catch (e) {
      res.json({ e });
   }
};

export const blockedUsers = async (req, res) => {
   try {
      const user = await User.findById({ _id: req.body.id });
      if (!user.blockedUsers.includes(req.body.blockedUsers)) {
         const result = await user.updateOne({
            $push: { blockedUsers: req.body.blockedUsers },
         });
         res.json({ result });
      } else {
         const result = await user.updateOne({
            $pull: { blockedUsers: req.body.blockedUsers },
         });
         res.json({ result });
      }
   } catch (e) {
      res.json({ e });
   }
};

export const mutedUsers = async (req, res) => {
   try {
      const user = await User.findById({ _id: req.body.id });
      if (!user.mutedUsers.includes(req.body.mutedUsers)) {
         const result = await user.updateOne({
            $push: { mutedUsers: req.body.mutedUsers },
         });
         res.json({ result });
      } else {
         const result = await user.updateOne({
            $pull: { mutedUsers: req.body.mutedUsers },
         });
         res.json({ result });
      }
   } catch (e) {
      res.json({ e });
   }
};

export const phoneNumber = async (req, res) => {
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { phoneNumber: req.body.phoneNumber }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const email = async (req, res) => {
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { email: req.body.email }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};

export const password = async (req, res) => {
   const user = await User.findById({ _id: req.body.id });
   const currentPassword = user.password;
   console.log(currentPassword);
   if (md5(req.body.currentPassword) === currentPassword) {
      try {
         const result = await User.updateOne(
            { _id: req.body.id },
            { password: md5(req.body.password) }
         );
         res.json({ result });
      } catch (e) {
         res.json({ e });
      }
   } else {
      res.json({
         message: "Your old password is incorrect.. Try again later ",
      });
   }
};

export const country = async (req, res) => {
   try {
      const result = await User.updateOne(
         { _id: req.body.id },
         { country: req.body.country }
      );
      res.json({ result });
   } catch (e) {
      res.json({ e });
   }
};
