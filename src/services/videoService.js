import axiosConfig from '~/utils/request';

const COUNT = 5;
const REGION = 'us';

export const getTrendingVideo = () => {
    try {
        return axiosConfig.get('/feed/list', {
            params: {
                region: REGION,
                count: COUNT,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
