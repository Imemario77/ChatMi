// configuration of redux store
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./reducers/rootReducer.js";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {persistor}
export default store;
