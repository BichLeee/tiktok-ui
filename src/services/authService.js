import axiosConfig from '~/utils/request';

export const login = (email, password) => {
    return axiosConfig.post('/auth/login', {
        email,
        password,
    });
};

export const logout = () => {
    return axiosConfig.post('/auth/logout');
};

export const signup = (email, password, type = 'email') => {
    return axiosConfig.post('/auth/register', {
        email,
        password,
        type,
    });
};
