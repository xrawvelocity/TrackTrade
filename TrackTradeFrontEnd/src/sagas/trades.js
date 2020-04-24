import { takeEvery, takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions";
import services from "../services";

function* getAllTrades() {
  try {
    const result = yield call(services.getAllTrades);
    console.log("getAllTrades saga", result);
  } catch (err) {
    console.log(err);
  }
}

function* watchGetAllTradesRequest() {
  yield takeEvery(actions.fetchAllTrades, getAllTrades);
}

function* postTrade(action) {
  try {
    const result = yield call(services.postTrade, action.payload);
    console.log("postTrade saga", result);
    yield put({type: "POST_TRADE_SUCCESS", payload: result});
  } catch (err) {
    console.log(err);
    yield put({type: "POST_TRADE_FAILED", payload: err});
  }
}
function* watchPostTradeRequest() {
  yield takeLatest("POST_TRADE", postTrade);
}

const tradesSagas = [
  fork(watchGetAllTradesRequest),
  fork(watchPostTradeRequest),
];

export default tradesSagas;
