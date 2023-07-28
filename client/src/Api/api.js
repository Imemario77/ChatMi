import axios from "axios";

const Api = axios.create({ baseUrl: "http://localhost:5000" });

export const signup = (formData) => Api.post("/auth/register", formData);
export const login = (formData) => Api.post("/auth/login", formData);
export const getUsers = (search) => Api.get(`/user/findusers/${search}`);
export const getSpecificUsers = (search) =>
   Api.get(`/user/findSpecificUsers/${search}`);
export const getUsersChats = (userId) => Api.get(`/chat/${userId}`);
export const findChat = (senderid, reciverid) =>
   Api.get(`/chat/find/${senderid}/${reciverid}`);
export const createChat = (formData) => Api.post("/chat/", formData);
export const createGroupChat = (formData) =>
   Api.post("/chat/CreateGroup", formData);
export const getUserGroups = (userId) => Api.get(`/chat/usersGroup/${userId}`);
export const getMessage = (chatId) => Api.get(`/message/getmessage/${chatId}`);
export const sendMessage = (messageinfo) =>
   Api.post("/message/sendmessage/", messageinfo);
export const updateNames = (data) => Api.post("/update/names", data);
export const updateImage = (data) => Api.post("/update/image", data);
export const updateCountry = (data) => Api.post("/update/country", data);
export const updateEmail = (data) => Api.post("/update/email", data);
export const updateAboutMe = (data) => Api.post("/update/AboutMe", data);
export const updatePassword = (data) => Api.post("/update/password", data);
export const updateAddress = (data) => Api.post("/update/address", data);
export const updateMuted = (data) => Api.post("/update/muted", data);
export const updateBlockedUsers= (data) => Api.post("/update/blockedUsers", data);
export const updateArchived = (data) => Api.post("/update/archived", data);
export const updateStaredUsers = (data) =>
   Api.post("/update/staredusers", data);
export const updatePhoneNumber = (data) =>
   Api.post("/update/phoneNumber", data);
