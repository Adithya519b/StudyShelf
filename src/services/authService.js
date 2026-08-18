import api from "./api";

export const studentLogin = async (loginData) => {

    return await api.post(
        "/student/login",
        loginData
    );

};