import services from "../services";
import * as types from "../constants/ActionTypes";

// add connection

export const addConnection = (id) => async (dispatch) => {
  const response = await services.addConnection(id);

  dispatch({
    type: types.ADD_CONNECTION,
    payload: response,
  });
};

// remove connection

export const removeConnection = (id) => async (dispatch) => {
  const response = await services.removeConnection(id);

  dispatch({
    type: types.REMOVE_CONNECTION,
    payload: response,
  });
};
