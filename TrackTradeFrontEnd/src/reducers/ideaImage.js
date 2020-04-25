import { IDEA_IMAGE_UPLOAD } from "../constants/ActionTypes";

export default (idea = null, action) => {
  switch (action.type) {
    case IDEA_IMAGE_UPLOAD:
      return (idea = action.payload);
    default:
      return idea;
  }
};
