import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});
export default apiClient;
