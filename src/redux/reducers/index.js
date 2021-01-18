import { combineReducers } from "redux";
import createReducer from "../helpers/createReducer";
import auth from "./auth";

export default combineReducers({
  teamMembers: createReducer("team members"),
  recommendations: createReducer("recommendations"),
  images: createReducer("images"),
  auth,
});
