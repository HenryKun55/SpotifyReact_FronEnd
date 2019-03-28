import axios from "axios";
import { getSpotifyToken } from "./auth";

const spotifyApi = axios.create({
  baseURL: "http://localhost:8888",
});

spotifyApi.interceptors.request.use(async config => {
  const token = getSpotifyToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default spotifyApi;