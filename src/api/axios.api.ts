import axios from "axios";
import { getToken } from "../helpers/localStorage.helper";

const urlAPI = ""; // Пане Семен, введіть посилання на api, коли задеплоєте його

export const instance = axios.create({
    baseURL: urlAPI,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);
