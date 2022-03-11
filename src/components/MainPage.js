import React, {useEffect, useState} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../Firebase-config";
import {useNavigate} from "react-router-dom";


export default function MovieApp() {
//navigate
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const unsubscribe = useEffect(() =>{
        if(!currentUser){
            console.log('no user')
            navigate('/')
        }
        return unsubscribe;
    }, [currentUser])

//logout
    const logout = async () =>{

        await signOut(auth);
        await setCurrentUser('');
    }
//main
    return(
        <>
            <h1>This will be an awesome Movie app</h1>
            {auth.currentUser ? <div>Zalogowano {auth.currentUser.email}</div> : null}
            <button onClick={logout}>Naura</button>
        </>
    )


}


