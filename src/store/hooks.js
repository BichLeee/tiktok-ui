import { useContext } from 'react';
import { UserContext } from './user';

export const useUser = () => {
    const [user, dispatch] = useContext(UserContext);

    return [user, dispatch];
};
