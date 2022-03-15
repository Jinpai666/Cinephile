import React, {useState} from "react";




export function MoviesRecommendations({handleOnClick, randomMovieRecommendation, recommendedMovies}){


    return(
        <div className="movies__row row">

            {/*{recommendedMovies && recommendedMovies.map((movie, idx) => (*/}
            {/*    <div key={idx} className="movies__movie">*/}
            {/*        {movie.poster_path*/}
            {/*            ? <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>*/}
            {/*            : <div className="movies__placeholder movies__poster">{movie.title}</div>}*/}
            {/*        <div onClick={() => handleOnClick(movie)} className="movies__overlay ">Add movie to favourites <AddOrRemoveFavouriteIcon /> </div>*/}
            {/*    </div>*/}

            {/*))}*/}
        </div>
    )

}