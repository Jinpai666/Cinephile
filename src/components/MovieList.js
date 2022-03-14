import React from "react";


const MovieList = ({movies}) => {

    return(

        <div className="movies__row row">

            {movies && movies.map((movie, idx) => (
                <div key={idx} className="movies__movie">

                    <img className="movies__poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`: "https://i.ibb.co/gy133B0/poster.jpg"} alt="movie poster"/>

                </div>
            ))}
        </div>

    )
}

export default MovieList;