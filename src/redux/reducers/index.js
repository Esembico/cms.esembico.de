import { combineReducers } from "redux";
import createReducer from "../helpers/createReducer";

export default combineReducers({
  teamMembers: createReducer("team members"),
  recommendations: createReducer("recommendations"),
  images: createReducer("images"),
});
