import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../Firebase-config";
import {useNavigate} from "react-router-dom";
import MovieList from "./MovieList";
import MainPageHeader from "./MainPageHeader";


export default function MainPage() {
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

//states
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);
//fetch from API
    const getMovieRequest = async (searchValue) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=bb5ba78aff1cb6c4f1b3bc76546dabba&query=${searchValue}`
        const response = await fetch(url);
        const responseJson = await response.json();
        setMovies(responseJson.results)
    };
    useEffect(() =>{
        const unsubscribe = getMovieRequest(searchValue);
        return() => unsubscribe
    },[searchValue])
//functions
    const addFavouriteMovie = (movie) => {

        {favourites.includes(movie)
            ? console.log('already added')
            : setFavourites([...favourites,movie])}
        console.log(favourites)
    }
    const removeFavouriteMovie = (movie) => {
        setFavourites(favourites.filter((favourite)=> favourite.id !== movie.id))

    }

    return(
        <div className="movies">
            <MainPageHeader searchValue={searchValue} setSearchValue={setSearchValue} logout={logout} currentUser={currentUser} heading="Cinephile"/>
            <MovieList
                movies={movies}
                addFavouritesClick={addFavouriteMovie}
                favourites={favourites}
                removeFavouritesClick={removeFavouriteMovie}
            />
        </div>
    )
}


