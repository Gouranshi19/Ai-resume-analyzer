import api from "./api";

export const registerUser = async (data) => {
    const response = await api.post("/auth/register/", data);
    return response.data;
    };

    export const loginUser = async (data) => {
    const response = await api.post("/auth/login/", data);

    // Save JWT tokens after login
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
    };

    export const getCurrentUser = async () => {
    const response = await api.get("/auth/me/");
    return response.data;
    };

    export const logoutUser = async () => {
    const refresh = localStorage.getItem("refresh");

    if (refresh) {
        try {
        await api.post("/auth/logout/", {
            refresh,
        });
        } catch (err) {
        console.error(err);
        }
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};