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
            state.account = { ...action.payload.data };
            state.token = action.payload.token;

            localStorage.setItem('user', JSON.stringify(action.payload.data));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        logout: (state) => {
            state.account = initState.account;
            state.token = initState.token;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.account;

export default userSlice.reducer;
