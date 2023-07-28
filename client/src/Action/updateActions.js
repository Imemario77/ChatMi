import * as Api from "../Api/api.js";

export const aboutMe = async (formdata) => {
   try {
      const { data } = await Api.updateAboutMe(formdata);
      return data;
   } catch (e) {
      console.log(e);
   }
};
