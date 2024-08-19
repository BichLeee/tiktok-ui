import axios from 'axios';

const axiosConfig = axios.create({
    //baseURL: 'https://tiktok.fullstack.edu.vn/api',
    baseURL: 'https://tiktok-scraper7.p.rapidapi.com',
    hostname: process.env.XRapidAPIHost,
    headers: {
        'x-rapidapi-key': process.env.REACT_APP_XRapidAPIKey,
        'x-rapidapi-host': process.env.REACT_APP_XRapidAPIHost,
    },
});

export default axiosConfig;
