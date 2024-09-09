import axiosConfig from '~/utils/request';

export const login = (email, password) => {
    return axiosConfig.post('/auth/login', {
        email,
        password,
    });
};
