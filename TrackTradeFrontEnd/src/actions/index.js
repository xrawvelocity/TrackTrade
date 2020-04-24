import services from "../services";
import * as types from "../constants/ActionTypes";

// getTrades

export const fetchAllTrades = () => async (dispatch) => {
  const response = await services.getAllTrades();
  dispatch({
    type: types.FETCH_ALLTRADES,
    payload: response,
  });
};

export const fetchTrades = () => async (dispatch) => {
  const response = await services.getTrades();
  dispatch({
    type: types.FETCH_TRADES,
    payload: response,
  });
};

export const selectTrade = (trade) => {
  return {
    type: types.TRADE_SELECTED,
    payload: trade,
  };
};

// getTradeIdeas

export const fetchAllTradeIdeas = () => async (dispatch) => {
  const response = await services.getAllIdeas();
  dispatch({
    type: types.FETCH_ALLTRADEIDEAS,
    payload: response,
  });
};

export const fetchTradeIdeas = () => async (dispatch) => {
  const response = await services.getIdeas();
  dispatch({
    type: types.FETCH_TRADEIDEAS,
    payload: response,
  });
};

export const selectTradeIdea = (tradeIdea) => {
  return {
    type: types.TRADEIDEA_SELECTED,
    payload: tradeIdea,
  };
};

// find other profile

export const findOtherProfile = (username) => async (dispatch) => {
  const response = await services.findOtherProfile(username);

  dispatch({
    type: types.FETCH_USER,
    payload: response.data,
  });
};

// get all traders

export const fetchAllTraders = () => async (dispatch) => {
  const response = await services.getAllTraders();

  dispatch({
    type: types.FETCH_ALLUSERS,
    payload: response,
  });
};

// post trade
export const postTrade = (trade) => async (dispatch) => {
  const response = await services.postTrade(trade);

  dispatch({
    type: types.POST_TRADE,
    payload: response,
  });
};

export const postTradeSuccess = () => {};

// trade idea image
export const tradeImageUpload = (image) => async (dispatch) => {
  const response = await services.handleTradeUpload(image);

  dispatch({
    type: types.TRADE_IMAGE_UPLOAD,
    payload: response,
  });
};

// post trade idea
export const postIdea = (trade) => async (dispatch) => {
  const response = await services.postIdea(trade);

  dispatch({
    type: types.POST_IDEA,
    payload: response,
  });
};

// delete trade idea
export const deleteIdea = (trade) => async (dispatch) => {
  const response = await services.deleteIdeas(trade);

  dispatch({
    type: types.DELETE_IDEA,
    payload: response,
  });
};

// trade idea image
export const ideaImageUpload = (image) => async (dispatch) => {
  const response = await services.handleIdeaUpload(image);

  dispatch({
    type: types.IDEA_IMAGE_UPLOAD,
    payload: response,
  });
};

// profile avatar update
export const updateAvatar = (image) => async (dispatch) => {
  const response = await services.updateAvatar(image);

  dispatch({
    type: types.AVATAR_UPLOAD,
    payload: response,
  });
};
