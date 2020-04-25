import { TRADE_IMAGE_UPLOAD } from "../constants/ActionTypes";

export default (trade = null, action) => {
  switch (action.type) {
    case TRADE_IMAGE_UPLOAD:
      return (trade = action.payload);
    default:
      return trade;
  }
};
