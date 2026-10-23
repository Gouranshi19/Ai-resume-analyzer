import api from "./api";

export const createAnalysis = async (data) => {
    const response = await api.post("/analysis/", data);
    return response.data;
};

export const getAnalysisDetail = async (id) => {
    const response = await api.get(`/analysis/${id}/`);
    return response.data;
};

export const generateAnalysisSuggestions = async (id) => {
    const response = await api.post(`/analysis/${id}/suggestions/`);
    return response.data;
};

export const getAnalysisHistory = async () => {
    const response = await api.get("/analysis/");
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await api.get("/analysis/stats/");
    return response.data;
};
