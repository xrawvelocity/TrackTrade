import {
  FETCH_ALLTRADES_SUCCESS,
  FETCH_ALLTRADES_ERROR,
  FETCH_TRADES,
  POST_TRADE,
} from "../constants/ActionTypes";
const initialState = {
  trades: [],
  moretrades: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLTRADES_SUCCESS:
      return {
        ...state,
        trades: action.payload,
      };
    case FETCH_ALLTRADES_ERROR:
      return {
        ...state,
        trades: action.payload,
      };
    case FETCH_TRADES:
      return {
        ...state,
        moretrades: action.payload,
      };
    case POST_TRADE:
      return {
        ...state,
        trades: state.trades.concat([action.payload]),
      };
    default:
      return state;
  }
};
