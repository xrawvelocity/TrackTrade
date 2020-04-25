import { combineReducers } from "redux";
import trades from "./trades";
import tradeImage from "./tradeImage";
import ideas from "./ideas";
import ideaImage from "./ideaImage";
import allProfiles from "./allProfiles";
import otherProfile from "./otherProfile";
import connections from "./connections";
import messages from "./messages";
import auth from "./auth";
import updateAvatar from "./updateAvatar";

export default combineReducers({
  trades,
  tradeImage,
  ideas,
  ideaImage,
  auth,
  allProfiles,
  otherProfile,
  connections,
  messages,
  updateAvatar,
});
