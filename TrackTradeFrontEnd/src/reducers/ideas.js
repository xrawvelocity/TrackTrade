import {
  FETCH_ALLTRADEIDEAS,
  FETCH_TRADEIDEAS,
  POST_IDEA,
  DELETE_IDEA,
} from "../constants/ActionTypes";
const initialState = {
  ideas: [],
  moreideas: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLTRADEIDEAS:
      return {
        ...state,
        ideas: action.payload,
      };
    case FETCH_TRADEIDEAS:
      return {
        ...state,
        moreideas: action.payload,
      };
    case POST_IDEA:
      return {
        ...state,
        ideas: state.ideas.concat([action.payload]),
      };
    case DELETE_IDEA:
      const { ideas } = state;
      const newIdeas = ideas.filter((idea) => idea.id !== action.payload.id);
      return {
        ...state,
        ideas: newIdeas,
      };
    default:
      return state;
  }
};
