import { combineReducers } from "redux";

// loggedin user's trades
import trades from "./trades";

// loggedin user's trade ideas
import ideas from "./ideas";

// other users data
import otherProfileReducer from "./profile/otherProfileReducer";
import allTradesReducer from "./home/allTradesReducer";
import allTradeIdeasReducer from "./home/allTradeIdeasReducer";
import allTradersReducer from "./home/allTradersReducer";

// connect with other users
import addConnectionReducer from "./profile/addConnectionReducer";
import removeConnectionReducer from "./profile/removeConnectionReducer";

// messages
import allMessagesReducer from "./profile/allMessagesReducer";
import sendMessageReducer from "./profile/sendMessageReducer";

// auth
import auth from "./auth";

// avatar
import updateAvatarReducer from "./profile/updateAvatarReducer";

export default combineReducers({
  trades,

  ideas,

  auth,

  // other users data
  otherProfile: otherProfileReducer,
  allTraders: allTradersReducer,

  // connect with other users
  addConnection: addConnectionReducer,
  removeConnection: removeConnectionReducer,

  // messages
  allMessages: allMessagesReducer,
  sendMessage: sendMessageReducer,

  // avatar
  updateAvatar: updateAvatarReducer,
});
