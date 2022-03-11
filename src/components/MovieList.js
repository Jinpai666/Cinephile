import React from "react";

const MovieList = ({movies}) => {
    return(
        <div className="movies">
            {movies.map((movie, idx) => (
                <div key={idx} className="movies__row">>
                    <img className="movies__poster" src={movie.Poster} alt="movie poster"></img>
                </div>
            ))}
        </div>

    )
}

export default MovieList;