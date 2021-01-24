import { combineReducers } from "redux";
import auth from "./auth";
import pageState from "./pageState";
import StateRegister from "../../register/StateRegister";

export default combineReducers({
  ...StateRegister.getReducers(),
  auth,
  pageState,
});
