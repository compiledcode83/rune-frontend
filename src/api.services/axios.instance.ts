import axios from "axios";
import apiConfig from "../configs/api.config";

const axiosInstance = axios.create({ baseURL: apiConfig.serverUrl });

export default axiosInstance;
