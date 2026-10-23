import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url ?? "";
        const isAuthRequest = /\/auth\/(login|register|google|refresh)\//.test(requestUrl);

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            isAuthRequest
        ) {
            return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.assign("/login");
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (!refreshPromise) {
            refreshPromise = axios
                .post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
                    refresh: refreshToken,
                })
                .then(({ data }) => {
                    localStorage.setItem("access", data.access);
                    if (data.refresh) {
                        localStorage.setItem("refresh", data.refresh);
                    }
                    return data.access;
                })
                .finally(() => {
                    refreshPromise = null;
                });
        }

        try {
            const accessToken = await refreshPromise;
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.assign("/login");
            return Promise.reject(refreshError);
        }
    }
);

export default api;
