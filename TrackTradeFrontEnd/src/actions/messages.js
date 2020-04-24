import services from "../services";
import * as types from "../constants/ActionTypes";

// get all messages

export const fetchAllMessages = () => async (dispatch) => {
  const response = await services.getAllMessages();
  dispatch({
    type: types.FETCH_ALLMESSAGES,
    payload: response,
  });
};

// send message

export const sendMessage = (data) => async (dispatch) => {
  const response = await services.sendMessage(data);

  dispatch({
    type: types.SEND_MESSAGE,
    payload: response,
  });
};
