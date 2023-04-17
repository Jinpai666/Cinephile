import React from "react";
import AddOrRemoveFavouriteIcon from "./AddOrRemoveFavouriteIcon";


export function MoviesRecommendations({handleOnClick, recommendedMovies, favourites}) {
    function filteredMovies () {


        return recommendedMovies.filter(movie => !favourites?.map((favMovie) => favMovie.id).includes(movie.id));
    }

    return (
        <div className="movies__row row">
            {recommendedMovies && filteredMovies().map((movie, idx) => (
                <div key={idx} className="movies__movie">
                    {movie.poster_path
                        ?
                        <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                             alt={movie.title}/>
                        : <div className="movies__placeholder movies__poster">{movie.title}</div>}
                    <div onClick={() => handleOnClick(movie)} className="movies__overlay ">Add to
                        favourites <AddOrRemoveFavouriteIcon/></div>
                </div>

            ))}
        </div>
    )
}