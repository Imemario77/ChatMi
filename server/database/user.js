import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      unique: true,
   },
   firstName: {
      type: String,
      reqiured: true,
   },
   lastName: {
      type: String,
      reqiured: true,
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
      reqiured: true,
   },
   aboutMe: String,
   staredUsers: Array,
   blockedUsers: Array,
   phoneNumber: String,
   mutedUsers: Array,
   archiveChats: Array,
   address: String,
   image: String,
   country: String,
});

const User = new mongoose.model("user", userSchema);

export default User;
