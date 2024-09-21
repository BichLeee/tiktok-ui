import { configureStore } from '@reduxjs/toolkit';

import langReducer from './languages';
import userReducer from './user';

const store = configureStore({
    reducer: {
        user: userReducer,
        lang: langReducer,
    },
});

export default store;
