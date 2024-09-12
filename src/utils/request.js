import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api',
});

axiosConfig.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token.toString()}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

export default axiosConfig;
