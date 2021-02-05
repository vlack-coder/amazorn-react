import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";
// import message from "./message";

export default combineReducers({
  auth,
  // message,
  product
});