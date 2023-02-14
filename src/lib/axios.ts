import storage from "@/utils/storage";
import Axios, { InternalAxiosRequestConfig } from "axios";

export const axios = Axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

const refreshToken = async () => {
    try {
        const {
            data: { accessToken },
        } = await axios.get("/auth/refresh");

        storage.setToken(accessToken);

        return true;
    } catch (error) {
        throw "UNAUTHORIED";
    }
};

axios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = storage.getToken();

        if (accessToken) {
            config.headers.Authorization = "Bearer " + accessToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.retrying) {
            originalRequest.retrying = true;

            console.log("get refresh token");
            const isValidRefreshToken = await refreshToken();

            if (isValidRefreshToken) {
                console.log("send again");

                return axios(originalRequest);
            }

            throw new Error("UNAUTHORIED");
        } else {
            throw error;
        }
    }
);
