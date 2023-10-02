import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    signIn: () => { },
    signOut: () => { },
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const signIn = (newToken, newUserId) => {
        setToken(newToken);
        setUserId(newUserId);
    };

    const signOut = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
