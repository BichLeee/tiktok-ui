import axiosConfig from '~/utils/request';

export const getCurrentUser = (page = 1) => {
    try {
        return axiosConfig.get('/auth/me');
    } catch (err) {
        console.log(err);
    }
};

export const getUsers = (page = 1, per_page = 12) => {
    try {
        return axiosConfig.get('/users/suggested', {
            params: { per_page, page },
        });
    } catch (err) {
        console.log(err);
    }
};

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

export const updateProfile = ({
    avatar,
    nickname,
    firstName,
    lastName,
    bio,
}) => {
    try {
        var bodyFormData = new FormData();

        nickname && bodyFormData.append('nickname', nickname);
        firstName && bodyFormData.append('first_name', firstName);
        lastName && bodyFormData.append('last_name', lastName);
        avatar && bodyFormData.append('avatar', avatar);
        bio && bodyFormData.append('bio', bio);

        return axiosConfig.post(`/auth/me`, bodyFormData, {
            params: { _method: 'PATCH' },
        });
    } catch (err) {
        console.log(err);
    }
};
