import * as Api from "../Api/api.js";

export const findChat = async (senderid, reciverid) => {
   try {
      const { data } = await Api.findChat(senderid, reciverid);
      return data;
   } catch (e) {
      console.log(e);
   }
};

export const createGroupChat = async (formData) => {
   try {
      const result = await Api.createGroupChat(formData);
      return result;
   } catch (e) {
      console.log(e);
   }
};
