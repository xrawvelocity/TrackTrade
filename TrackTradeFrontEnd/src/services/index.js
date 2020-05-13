import axios from "axios";
let baseURL;

console.log("client ");

process.env.NODE_ENV === "production"
  ? //? (baseURL = 'here should be your production endpoint')
    (baseURL = "https://tracktrade.herokuapp.com")
  : (baseURL = "http://localhost:5000");

const service = axios.create({ withCredentials: true, baseURL });

const services = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async (user) => {
    return await service.post("/sign-up", user);
  },
  logIn: async (user) => {
    return await service.post("/log-in", user);
  },
  logOut: async () => {
    return await service.get("/log-out");
  },
  updateAvatar: async (theFile) => {
    return await service
      .post("/updateAvatar", theFile)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  
  postIdea: async (trade) => {
    return await service.post("/postIdea", trade);
  },
  updateIdea: async (trade) => {
    return await service.post("/updateIdea", trade);
  },
  deleteIdeas: async (id) => {
    return await service.post("/delete-ideas", id);
  },
  getIdeas: async () => {
    return await service.get("/get-ideas");
  },
  getAllIdeas: async () => {
    return await service.get("/get-all-ideas");
  },


  postTrade: async (trade) => {
    return await service.post("/postTrade", trade);
  },

  getTrades: async () => {
    return await service.get("/get-trades");
  },
  fetchAllTrades: async () => {
    return await service.get("/get-all-trades");
  },



  //trade idea screenshot upload
  handleIdeaUpload: async (theFile) => {
    return await service
      .post("/ideaUpload", theFile)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  //trade idea screenshot update
  handleIdeaUpdate: async (theFile) => {
    return await service
      .post("/ideaUpdate", theFile)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  //trade screenshot upload
  handleTradeUpload: async (theFile) => {
    return await service
      .post("/tradeUpload", theFile)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },

  findOtherProfile: async (username) => {
    return await service.post("/find-other-profile", username);
  },
  getAllTraders: async () => {
    return await service.get("/get-all-traders");
  },
  addConnection: async (userID) => {
    return await service
      .post("/addConnection", userID)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  removeConnection: async (userID) => {
    return await service
      .post("/removeConnection", userID)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  sendMessage: async (data) => {
    return await service
      .post("/addMessage", data)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
  getAllMessages: async () => {
    return await service.get("/get-all-messages");
  },
};

export default services;
