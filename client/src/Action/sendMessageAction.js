import * as Api from "../Api/api.js";

export const sendMessage = async (messageInfo) => {
   try {
      const { data } = await Api.sendMessage(messageInfo);
      return data;
   } catch (e) {
      console.log(e);
   }
};
