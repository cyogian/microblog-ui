import axios from "axios";

const instance = axios.create({
  baseURL: "https://themicroblogapp.herokuapp.com/api",
});

export default instance;
