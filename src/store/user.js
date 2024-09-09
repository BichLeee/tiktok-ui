const { createContext, useState, useReducer } = require('react');

const UserContext = createContext();

const initState = { email: null, data: null };

const ACTIONS = {
    LOGIN: 'login',
    LOGOUT: 'logout',
};

const reducer = (state, action) => {
    switch (action.name) {
        case ACTIONS.LOGIN:
            return {
                email: action.payload.email,
                data: action.payload,
            };
        case ACTIONS.LOGOUT:
            return initState;
    }
};

function UserProvider({ children }) {
    const [user, dispatch] = useReducer(reducer, initState);

    return (
        <UserContext.Provider value={[user, dispatch]}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
export { ACTIONS as UserActions };
