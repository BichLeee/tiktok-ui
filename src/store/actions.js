import { type } from '@testing-library/user-event/dist/type';
import { UserActions } from './user';

export const login = (payload) => ({
    type: UserActions.LOGIN,
    payload,
});

export const logout = (payload) => ({
    type: UserActions.LOGOUT,
    payload,
});
