import {
  CHECK_LOGIN,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
} from "../constants/ActionTypes";

export default function user(user = null, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return (user = action.payload);

    case LOG_IN:
      return (user = action.payload);

    case LOG_OUT:
      return (user = action.payload);

    case SIGN_UP:
      return (user = action.payload);
    default:
      return user;
  }
}
