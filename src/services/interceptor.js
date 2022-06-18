import axios from 'axios';
import store from '../Redux/Store';
import { setError } from '../Redux/Slice/errorSlice';
import {getToken} from "../utils";
const BASE_URL = 'https://therapist-server.herokuapp.com/';

// Add a request interceptor
let axiosInstance = axios.create({
    baseURL: `${BASE_URL}`
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    let token = getToken();
    if (token) {
        if (config.method !== 'OPTIONS') {
            config.headers.authorization = `Bearer ${token}`;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    if (error.response) {
        store.dispatch(setError(
            {
                error: true,
                show: true,
                errorMsg: error?.response?.data?.message[0]?.messages[0]?.message
            }
        ))
    }

    // Do something with response error
    return Promise.reject(error);
});

export default axiosInstance;
