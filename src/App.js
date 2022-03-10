import React, {useEffect, useState} from 'react';
import "./scss/App.scss";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import MovieApp from "./components/MainPage";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { auth } from './Firebase-config'
import { signOut } from 'firebase/auth';
import {LoggedInProvider} from "./contexts/AuthContext";



export default function App() {

    const logout = async () =>{
        await signOut(auth);
    }
    return(
        <>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn/>}/>
                        <Route  path="/signup" element={<SignUp/>}/>
                        <Route  path="/main" element={<MovieApp/>} />
                    </Routes>

                    <button onClick={logout}>Signout peace yo</button>
                </BrowserRouter>

        </>
    );
}



