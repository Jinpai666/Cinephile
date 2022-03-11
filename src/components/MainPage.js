import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../Firebase-config";
import {useNavigate} from "react-router-dom";
import MovieList from "./MovieList";
import MainPageHeader from "./MainPageHeader";
import MainPageSearchBox from "./MainPageSearchBox";


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
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('')

    const getMovieRequest = async (searchValue) => {

        const url = `  https://api.themoviedb.org/3/search/movie?api_key=bb5ba78aff1cb6c4f1b3bc76546dabba&query=${searchValue}`
        // const url = `http://www.omdbapi.com/?i=tt3896198&apikey=aae1375&s=${searchValue}`
        const response = await fetch(url);
        const responseJson = await response.json();
        setMovies(responseJson.results)
        // setMovies(responseJson.Search)
        console.log(movies)
    };

    useEffect(() =>{
        const unsubscribe = getMovieRequest(searchValue);
        return() => unsubscribe
    },[searchValue])

    return(
        <div className="movies">
            <div className="movies__header row">
                <MainPageHeader heading="Cinephile"/>
                <MainPageSearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <button onClick={logout}>Log out</button>
            <MovieList movies={movies}/>
        </div>
    )
}


