import * as Api from "../Api/api.js";

export const register = async (formData) => {
   try {
      const response = await Api.signup(formData);
      return response;
   } catch (e) {
      console.log(e)
   }
};

export const login = async ( formData) => {
   try {
      const response = await Api.login(formData)
      return response
   } catch (e) {
      console.log(e)
   }
}