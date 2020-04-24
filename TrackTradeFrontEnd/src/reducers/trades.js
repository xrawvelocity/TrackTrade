import {
  FETCH_ALLTRADES,
  FETCH_TRADES,
  TRADE_SELECTED,
  POST_TRADE,
  TRADE_IMAGE_UPLOAD,
} from "../constants/ActionTypes";

export default (trade = null, action) => {
  switch (action.type) {
    case FETCH_ALLTRADES:
      return (trade = action.payload);

    case FETCH_TRADES:
      return (trade = action.payload);

    case TRADE_SELECTED:
      return action.payload;

    case POST_TRADE:
      return (trade = action.payload);

    case TRADE_IMAGE_UPLOAD:
      return (trade = action.payload);

    default:
      return trade;
  }
};
