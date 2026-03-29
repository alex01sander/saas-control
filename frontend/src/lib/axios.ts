import axios from "axios";

export const api = axios.create({
    // Se a variável de ambiente existir, usa ela. Senão, cai no localhost (para quando você estiver desenvolvendo)
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("@SaaSControl:token");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("@SaaSControl:token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);
