import {
  FETCH_ALLTRADEIDEAS,
  FETCH_TRADEIDEAS,
  TRADEIDEA_SELECTED,
  POST_IDEA,
  DELETE_IDEA,
  IDEA_IMAGE_UPLOAD,
} from "../constants/ActionTypes";

export default (idea = null, action) => {
  switch (action.type) {
    case FETCH_ALLTRADEIDEAS:
      return (idea = action.payload);

    case FETCH_TRADEIDEAS:
      return (idea = action.payload);

    case TRADEIDEA_SELECTED:
      return action.payload;

    case POST_IDEA:
      return (idea = action.payload);

    case DELETE_IDEA:
      return (idea = action.payload);

    case IDEA_IMAGE_UPLOAD:
      return (idea = action.payload);

    default:
      return idea;
  }
};
