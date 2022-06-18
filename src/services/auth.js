import axiosInstance from "./interceptor";

const AuthServices = {
    login: (payload)=> {
        return axiosInstance.post(`/auth/local`, payload)
    },

    register: (payload)=> {
        return axiosInstance.post(`/auth/local/register`, payload)
    },

};

export default AuthServices;
