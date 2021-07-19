import React, {createContext, useState, useEffect, useContext} from 'react';
// import {auth} from '../firebase';
import api from '../api/api';

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider(props){
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const getLoggedIn = async () => {
        const loggedInRes = await api.get("/admins/loggedIn");
        // console.log(loggedInRes.data);
        setLoggedIn(loggedInRes.data);
        setLoading(false);
    }

    useEffect(() => {
        let unmounted = false;
        
        if(!unmounted){
            getLoggedIn();
        };

        return ()=>{unmounted=true};
    }, []);

    return (
      <AuthContext.Provider
        value={{ loggedIn, getLoggedIn, currentUser, setCurrentUser}}
      >
        {!loading && props.children}
        {/* {props.children} */}
      </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthProvider};