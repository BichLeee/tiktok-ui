import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api',
});

export default axiosConfig;
