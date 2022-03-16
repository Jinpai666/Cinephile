import React from "react";
import {MoviesSearchResults} from "./MoviesSearchResults";
import {MoviesFavourites} from "./MoviesFavourites";
import {MoviesRecommendations} from "./MoviesRecommendations";




const MovieList = ({
                       movies,
                       addFavouritesClick,
                       favourites,
                       removeFavouritesClick,
                       randomMovieRecommendation,
                       recommendedMovies,

}) => {

    return(
        <>
            <h1 className="movies__section">Search results:</h1>
            <MoviesSearchResults
                movies={movies}
                favourites={favourites}
                handleOnClick={addFavouritesClick}
            />
            <h1 className="movies__section">Favourites</h1>
            <MoviesFavourites
                favourites={favourites}
                handleOnClick={removeFavouritesClick}
            />
            <h1 className="movies__section">Recommended for you</h1>
            <MoviesRecommendations
                recommendedMovies = {recommendedMovies}
                randomMovieRecommendation={randomMovieRecommendation}
                handleOnClick={addFavouritesClick}
                movies={movies}
                favourites={favourites}
            />
        </>


    )
}

export default MovieList;