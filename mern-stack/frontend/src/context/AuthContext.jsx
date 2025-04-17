import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(() => {
        let saveToken =  JSON.parse(localStorage.getItem("token"));
        return { token: saveToken || null }
    })


    useEffect(() => {
        if (auth?.token) {
            localStorage.setItem('token', JSON.stringify(auth?.token))
        }
    }, [auth?.token]);

    return(
        <Authcontext.Provider  value={[auth, setAuth]}>
            {children}
        </Authcontext.Provider>
    )
}

const useAuth = () => {
    return useContext(Authcontext);
}

export {
    useAuth , AuthProvider
}