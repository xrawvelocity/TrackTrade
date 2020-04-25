export default (image = null, action) => {
  switch (action.type) {
    case "AVATAR_UPLOAD":
      return (image = action.payload);
    default:
      return image;
  }
};
