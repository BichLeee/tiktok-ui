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

export const getUserVideos = (id) => {
    try {
        return axiosConfig.get(`/users/${id}/videos`);
    } catch (err) {
        console.log(err);
    }
};

export const postVideo = ({ userID, description, video, thumbnailTime }) => {
    try {
        var bodyFormData = new FormData();

        description && bodyFormData.append('description', description);
        video && bodyFormData.append('upload_file', video);
        thumbnailTime && bodyFormData.append('thumbnail_time', thumbnailTime);

        return axiosConfig.post(`/videos/${userID}?_method=PATCH`, bodyFormData, {
            headers: { key: 'Accept', value: 'application/json', type: 'text' },
        });
    } catch (err) {
        console.log(err);
    }
};
