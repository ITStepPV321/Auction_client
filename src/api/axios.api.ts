import axios from "axios";
import { getToken } from "../helpers/localStorage.helper";

const urlAPI = "https://localhost:7017/api"; //"https://auctionclient2-cnguh0f5hzhfetey.polandcentral-01.azurewebsites.net/api";
//"https://auctionwebapi-hacgcbg3btcnawct.polandcentral-01.azurewebsites.net/api"
// Пане Семен, введіть посилання на api, коли задеплоєте його

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
