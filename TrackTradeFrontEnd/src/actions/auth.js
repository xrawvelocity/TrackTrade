import services from "../services";
import * as types from "../constants/ActionTypes";

// check log in
export const checkLogin = () => async (dispatch) => {
  const response = await services.isLoggedIn();
  dispatch({
    type: types.CHECK_LOGIN,
    payload: response,
  });
};

// log in
export const logIn = (data) => async (dispatch) => {
  const response = await services.logIn(data);
  dispatch({
    type: types.LOG_IN,
    payload: response,
  });
};

// sign up
export const signUp = (data) => async (dispatch) => {
  const response = await services.signUp(data);
  dispatch({
    type: types.SIGN_UP,
    payload: response,
  });
};

// log out
export const logOut = () => async (dispatch) => {
  const response = await services.logOut();
  dispatch({
    type: types.LOG_OUT,
    payload: response,
  });
};
