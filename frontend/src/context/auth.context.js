import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export  const AuthContextProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        localStorage.getItem("token")  ? setIsLoggedIn(true) : setIsLoggedIn(false);
    })

    const authReducer = (state, action) =>{
        if(action.type === "login"){
            localStorage.setItem("token", action.payload);
            setIsLoggedIn(true);
        }else if(action.type === "logout"){
            localStorage.removeItem("token",);
            setIsLoggedIn(false);
        }
    }

    const [state, dispatch] = useReducer(authReducer, isLoggedIn);

    return <AuthContext.Provider value={{data: isLoggedIn, dispatch}} >
        {children}
    </AuthContext.Provider>

}