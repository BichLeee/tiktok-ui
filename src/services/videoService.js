import axiosConfig from '~/utils/request';

export const getTrendingVideo = (page = 1, type = 'for-you') => {
    try {
        return axiosConfig.get('/videos', {
            params: {
                type,
                page,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
