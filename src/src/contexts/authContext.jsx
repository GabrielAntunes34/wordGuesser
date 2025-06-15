import { createContext, useContext, useEffect, useState } from "react";
import {mkLogin, mkRegister, mkGetUser} from '../tests/userMock';

const authContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Resets user from localStorage at each reload
    useEffect(() => {
        const myUser = mkGetUser('myUser');
        if(myUser)
            setUser(myUser);
    }, []);

    // Saves user at localStorage when it changes
    useEffect(() => {
        if (user)
            localStorage.setItem('myUser', JSON.stringify(user));
    }, [user]);

    // Defining a local login function --> Should become our real logic
    const login = async (email, password) => {
        const newUser = await mkLogin(email, password);
        if(!newUser)
            return false

        setUser(newUser);
        return true;
    }

    // Defining a local logout function
    const logout = async () => {
        setUser(null);
    }

    const signup = async (formData) => {
        const user = await mkRegister(formData);
        await login(user.email, user.password);
        return true;
    }

    return (
        <>
            <authContext.Provider value={{ user, setUser, login, logout, signup}}>
                {children}
            </authContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };