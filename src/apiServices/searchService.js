import axiosConfig from '~/utils/request';

export const search = (query, type = 'less') => {
    try {
        return axiosConfig.get('users/search', {
            params: {
                q: query,
                type,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
