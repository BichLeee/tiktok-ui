import { createSlice } from '@reduxjs/toolkit';

const initState = {
    account: {},
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload.data));
            localStorage.setItem('token', JSON.stringify(action.payload.token));

            state.account = { ...action.payload.data };
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            state.account = initState.account;
            state.token = initState.token;
        },
        updateFollowings: (state, action) => {
            state.followings_count = action.payload.followings_count;
        },
    },
});

export const { login, logout, updateFollowings } = userSlice.actions;
export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
