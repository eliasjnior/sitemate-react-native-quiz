import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    // TODO: add to env
    apiKey: "183daca270264bad86fc5b72972fb82a",
  },
});

export default api;
