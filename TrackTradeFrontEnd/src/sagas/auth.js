import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT,
} from "../constants/ActionTypes";
import { fork, cancel, take, put } from "redux-saga/effects";
import services from "../services";

function* authorize(user, password) {
  try {
    yield put({ type: LOG_IN_SUCCESS, payload: { user, password } });
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, error });
  }
}

function* loginFlow() {
  while (true) {
    const { user, password } = yield take(LOG_IN_REQUEST);
    const task = yield fork(authorize, user, password);
    const action = yield take([LOG_OUT, LOG_IN_ERROR]);
    if (action.type === "LOG_OUT") {
      yield cancel(task);
    }
  }
}

const authSagas = [
    fork(loginFlow)
]
export default authSagas;