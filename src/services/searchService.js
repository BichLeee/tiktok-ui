import axiosConfig from '~/utils/request';

const COUNT = 10;

export const search = (query, type = 'less') => {
    try {
        return axiosConfig.get('user/search', {
            params: {
                keywords: query,
                count: COUNT,
                cursor: 0,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
