import axios from "axios";
import { Resources } from "./resources.ts";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: Resources.API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default api;
