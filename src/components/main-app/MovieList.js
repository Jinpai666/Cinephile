import React from "react";
import {MoviesSearchResults} from "./MoviesSearchResults";
import {MoviesFavourites} from "./MoviesFavourites";




const MovieList = ({movies, addFavouritesClick, favourites, removeFavouritesClick}) => {

    return(
        <>
            <h1 className="movies__section">Search results:</h1>
            <MoviesSearchResults movies={movies} addFavouritesClick={addFavouritesClick}/>
            <h1 className="movies__section">Favourites</h1>
            <MoviesFavourites favourites={favourites} removeFavouritesClick={removeFavouritesClick}/>
        </>


    )
}

export default MovieList;