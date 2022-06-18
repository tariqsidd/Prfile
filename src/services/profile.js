import axiosInstance from "./interceptor";

const ProfileServices = {
    getProfiles: ()=> {
        return axiosInstance.get(`/profiles`)
    },
    getProfile: (id)=> {
        return axiosInstance.get(`/profiles/${id}`)
    },
    imageUpload: (file)=>{
        return axiosInstance.post(`/upload`, file)
    },
    updateImage: (id, file)=> {
        return axiosInstance.put(`/upload?id=${id}`, file)
    },
    updateProfile: (id, payload)=> {
        return axiosInstance.put(`/profiles/${id}`, payload)
    },
};

export default ProfileServices;
