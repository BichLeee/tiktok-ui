import axiosConfig from '~/utils/request';

export const getFollowingsList = (page = 1) => {
    try {
        return axiosConfig.get('/me/followings', {
            params: {
                page,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export const followUser = (id) => {
    try {
        return axiosConfig.post(`/users/${id}/follow`);
    } catch (err) {
        console.log(err);
    }
};

export const unfollowUser = (id) => {
    try {
        return axiosConfig.post(`/users/${id}/unfollow`);
    } catch (err) {
        console.log(err);
    }
};
