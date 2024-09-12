import { useSelector } from 'react-redux';

import { selectUser } from './user';

function useUser() {
    const user = useSelector(selectUser);

    return user;
}

export { useUser };
