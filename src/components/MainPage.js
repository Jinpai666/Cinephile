import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../Firebase-config";
import {useNavigate} from "react-router-dom";
import MovieList from "./MovieList";


export default function MovieApp() {
//navigate
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user)
        })
        if(!currentUser){
            navigate('/')
        }
        return() => unsubscribe
    }, [currentUser])

//logout
    const logout = async () =>{

        await signOut(auth);
        await setCurrentUser('');
    }
//main

    const [movies, setMmovies] = useState([
        {
            "Title": "Dune",
            "Year": "2021",
            "imdbID": "tt1160419",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Dune",
            "Year": "1984",
            "imdbID": "tt0087182",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYTAzYzNlMDMtMGRjYS00M2UxLTk0MmEtYmE4YWZiYmEwOTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg"
        },
        {
            "Title": "Jodorowsky's Dune",
            "Year": "2013",
            "imdbID": "tt1935156",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTU0MzcxMTAxMl5BMl5BanBnXkFtZTgwODMyMTIxMTE@._V1_SX300.jpg"
        },
        {
            "Title": "Dune",
            "Year": "2000",
            "imdbID": "tt0142032",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTU4MjMyMTkxN15BMl5BanBnXkFtZTYwODA5OTU5._V1_SX300.jpg"
        },

    ]);

    return(
        <>
            <h1>This will be an awesome Movie app</h1>
            {auth.currentUser ? <div>Zalogowano {auth.currentUser.email}</div> : null}
            <button onClick={logout}>Naura</button>
            <MovieList movies={movies}/>
        </>
    )


}


