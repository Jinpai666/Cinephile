import React from 'react';
import "./scss/App.scss";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainPage from "./components/main-app/MainPage";



export default function App() {


    return(
        <>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn/>}/>
                        <Route  path="/signup" element={<SignUp/>}/>
                        <Route  path="/main" element={<MainPage/>} />
                    </Routes>

                </BrowserRouter>

        </>
    );
}



