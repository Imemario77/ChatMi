import { combineReducers } from "redux";
import authreducer from "./authReducer.js";
import searchreducer from "./searchReducer.js";
import messagereducer from "./messageReducer.js";
import groupreducer from "./createGroupReducer.js";
import updatereducer from "./updateReducer.js";
const rootReducer = combineReducers({
   authreducer,
   searchreducer,
   messagereducer,
   groupreducer,
   updatereducer,
});

export default rootReducer;
