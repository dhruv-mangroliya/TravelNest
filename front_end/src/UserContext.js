import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.post('/profile', { token: localStorage.getItem('token') }).then(({ data }) => {
                setUser(data);
                setReady(true);
            }).catch(error => console.log('error:', error));;
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
