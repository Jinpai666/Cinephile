import React from "react";
import AddOrRemoveFavouriteIcon from "./AddOrRemoveFavouriteIcon";



export function MoviesSearchResults({movies, handleOnClick, favourites}){

    function filteredMovies (){
       return movies.filter(movie => !favourites.map((favMovie) => favMovie.id).includes(movie.id));
        console.log(favourites)
    }

    return(
        //search results and then  filter to remove already added to favourite
        <div className="movies__row row">
            {movies && filteredMovies()
                .map((movie, idx) => (<div key={idx} className="movies__movie">{movie.poster_path
                ? <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                : <div className="movies__placeholder movies__poster">{movie.title}</div>}<div onClick={() => handleOnClick(movie)} className="movies__overlay ">Add to favourites <AddOrRemoveFavouriteIcon/> </div>
                </div>)
            )}
        </div>
    )

}