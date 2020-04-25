export default (connection = null, action) => {
  switch (action.type) {
    case "ADD_CONNECTION":
      return (connection = action.payload);

    case "REMOVE_CONNECTION":
      return (connection = action.payload);
    default:
      return connection;
  }
};
