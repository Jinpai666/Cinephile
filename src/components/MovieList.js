import React from "react";


const MovieList = ({movies}) => {

    return(

        <div className="movies__row row">
            {movies && movies.map((movie, idx) => (
                <div key={idx} className="movies__movie">

                    {/*<img className="movies__poster" src={movie.Poster} alt="movie poster"/>*/}
                    <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster"/>
                </div>
            ))}
        </div>

    )
}

export default MovieList;