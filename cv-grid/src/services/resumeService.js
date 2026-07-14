import api from "./api";

export const uploadResume = async (title, file) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    const response = await api.post("/resumes/upload/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getResumes = async () => {
    const response = await api.get("/resumes/");
    return response.data;
};

export const deleteResume = async (id) => {
    const response = await api.delete(`/resumes/${id}/`);
    return response.data;
};

export const updateResume = async (id, title) => {
    const response = await api.put(`/resumes/${id}/`, {
        title: title,
    });

    return response.data;
};