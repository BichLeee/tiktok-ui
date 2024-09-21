import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';

const initState = { current: 'vi' };

const langSlice = createSlice({
    name: 'lang',
    initialState: initState,
    reducers: {
        changeLanguage: (state, action) => {
            const newLang = action.payload.lang;

            localStorage.setItem('language', newLang);

            state.current = newLang;
            i18next.changeLanguage(newLang);
        },
    },
});

export const { changeLanguage } = langSlice.actions;
export const selectLang = (state) => state.lang.current;

export default langSlice.reducer;
