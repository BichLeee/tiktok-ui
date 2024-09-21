import { useSelector } from 'react-redux';

import { selectLang } from './languages';
import { selectUser } from './user';

function useUser() {
    const user = useSelector(selectUser);

    return user;
}

function useLang() {
    const lang = useSelector(selectLang);

    return lang;
}

export { useUser, useLang };
