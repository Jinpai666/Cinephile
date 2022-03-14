import React from "react";
import AddFavourite from "./AddFavourite";


const MovieList = ({movies}) => {

    return(

        <div className="movies__row row">

            {movies && movies.map((movie, idx) => (
                <div key={idx} className="movies__movie">
                    {movie.poster_path
                        ? <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                        : <div className="movies__placeholder movies__poster">{movie.title}</div>}
                    <div className="movies__overlay ">Add to favourites <AddFavourite/> </div>

                </div>

            ))}
        </div>

    )
}

export default MovieList;