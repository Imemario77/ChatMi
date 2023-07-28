import User from "../database/user.js";

// get all registered users in the app
export const getAllUsers = async (req, res) => {
   console.log("users");
   try {
      

      const found = await User.find({
         userName: { $regex: req.params.search, $options: "i" },
      });
      console.log(found);
      res.json({ found });
   } catch (e) {
      res.send(e);
   }
};

export const getAllUsersNoFilter = async (req, res) => {
   try {
      const found = await User.find();

      res.json({ found });
   } catch (e) {
      res.send(e);
   }
};

export const getUser = async (req, res) => {
   try {
      const users = await User.findOne({ _id: req.params.search });
      console.log(users);
      res.json({ users });
   } catch (e) {
      res.send(e);
   }
};
