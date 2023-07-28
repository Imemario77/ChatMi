import * as Api from "../Api/api.js";

export const getMessage = async (chatId) => {
   try {
      const { data } = await Api.getMessage(chatId);
      return data;
   } catch (e) {
      console.log(e);
   }
};
