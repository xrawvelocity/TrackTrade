import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import services from "../services";

export function* getAllTrades() {
  try {
    console.log("tried-------------");
    const result = yield services
      .fetchAllTrades()
      .then((res) => console.log("res", res.data));
    yield console.log("getAllTrades saga", result);
    yield put({ type: types.FETCH_ALLTRADES_SUCCESS, result });
  } catch (err) {
    console.log(err);
    yield put({ type: types.FETCH_ALLTRADES_ERROR, err });
  }
}

function* postTrade(action) {
  try {
    const result = yield call(services.postTrade, action.payload);
    console.log("postTrade saga", result);
    yield put({ type: "POST_TRADE_SUCCESS", payload: result });
  } catch (err) {
    console.log(err);
    yield put({ type: "POST_TRADE_FAILED", payload: err });
  }
}
function* watchPostTradeRequest() {
  yield takeLatest("POST_TRADE", postTrade);
}

const tradesSagas = [fork(getAllTrades), fork(watchPostTradeRequest)];

export default tradesSagas;
