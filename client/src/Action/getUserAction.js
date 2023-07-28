import * as Api from "../Api/api.js";

export const findUsers = async (search) => {
   try {
      const results = await Api.getUsers(search);
      return results;
   } catch (e) {
      console.log(e);
   }
};
export const findSpecificUsers = async (search) => {
   try {
      const { data } = await Api.getSpecificUsers(search);
      return data;
   } catch (e) {
      console.log(e);
   }
};

export const getUsersChats = async (userId) => {
   try {
      const result = await Api.getUsersChats(userId);
      return result;
   } catch (e) {
      console.log(e);
   }
};

export const getGroupChats = async (userId) => {
   try {
      const { data } = await Api.getUserGroups(userId);
      return data;
   } catch (e) {
      console.log(e);
   }
};

export const createChat = async (formData) => {
   try {
      const result = await Api.createChat(formData);
      return result;
   } catch (e) {
      console.log(e);
   }
};
