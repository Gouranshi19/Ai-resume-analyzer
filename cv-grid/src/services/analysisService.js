import api from "./api";

export const createAnalysis = async (data) => {

    const response = await api.post(
        "/analysis/",
        data
    );

    return response.data;
};

export const getAnalysis = async (id) => {

    const response = await api.get(
        `/analysis/${id}/`
    );

    return response.data;
};