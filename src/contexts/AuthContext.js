import React, { useContext, useState } from "react";
import { auth } from "../Firebase-config";

const AuthContext = React.createContext()

export function UseAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
const [currentUser, setCurrentUser] = useState()

    function login(email, password){

    }

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}