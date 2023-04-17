import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {
    auth
} from "../../Firebase-config";
// eslint-disable-next-line react-hooks/exhaustive-deps
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
        return() => unsubscribe()
    }, [currentUser, navigate])


//logout
    const logout = async () =>{
        await signOut(auth);
        await setCurrentUser(null);
    }

//states
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);



// get movies from API
    const getMovieRequest = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=bb5ba78aff1cb6c4f1b3bc76546dabba&query=${searchValue? searchValue : 'a'}`
        const response = await fetch(url);
        const responseJson = await response.json()
        await setMovies(responseJson?.results);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    useEffect(() => {
        const unsubscribe = getMovieRequest(searchValue)
        return() => unsubscribe
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValue])


// generate random movie
    const getRandomMovieRecommendation = async () => {

        // generate random nr
        const generateIndex = (min, max) => {
            return parseInt(Math.floor(Math.random() * (max - min) ) + min);
        }
        //random fav movie
        const randomFavMovieId = parseInt(favourites ? favourites[generateIndex(0, favourites.length - 1)]?.id : 0 )
        //random url
        const url = `https://api.themoviedb.org/3/movie/${randomFavMovieId? randomFavMovieId : '11'}/recommendations?api_key=bb5ba78aff1cb6c4f1b3bc76546dabba&language=en-US&page=1`
        const response = await fetch(url);
        const responseJson = await response.json()
        const randomResult = await responseJson.results[generateIndex(0,responseJson.results.length - 1)];
        // remove duplicates from randomMovies
        const randomMovies =[...recommendedMovies, randomResult];
        console.log('random',randomMovies)

        const uniqueMovies = randomMovies.filter((movie, index) => {
            return randomMovies.findIndex(m => m.id === movie.id) === index;
        });
        console.log('uniq',uniqueMovies)


        setRecommendedMovies(uniqueMovies);
    }
    useEffect( () => {
        const unsubscribe = recommendedMovies.length <= 20 && getRandomMovieRecommendation();
        return() => unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recommendedMovies.length, favourites.length]);


// local storage
    useEffect(() => {
        const unsubscribe = JSON.parse(
            localStorage.getItem('fav-movies')
        );

        setFavourites(unsubscribe? unsubscribe : []);
        return() => unsubscribe
    },[]);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('fav-movies', JSON.stringify(items))
    };

//functions
    const addFavouriteMovie =  (movie) => {
        const newList = [...favourites,movie]
        setFavourites(newList);
        saveToLocalStorage(newList)

        const newRecommendedList = [...recommendedMovies,movie]

        setRecommendedMovies(newRecommendedList)
    }
    const removeFavouriteMovie = (movie) => {
        const newList = favourites.filter(
            (favourite)=> favourite.id !== movie.id
        );
        setFavourites(newList);
        saveToLocalStorage(newList)
        setRecommendedMovies(recommendedMovies)
    }
    return(
        <div className="movies">
            <MainPageHeader searchValue={searchValue} setSearchValue={setSearchValue} logout={logout} currentUser={currentUser} heading="Cinephile"/>
            <MovieList
                movies={movies}
                addFavouritesClick={addFavouriteMovie}
                favourites={favourites}
                removeFavouritesClick={removeFavouriteMovie}
                recommendedMovies={recommendedMovies}
            />
        </div>
    )

}



