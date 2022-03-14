import React from "react";


const MovieList = ({movies}) => {

    return(

        <div className="movies__row row">

            {movies && movies.map((movie, idx) => (
                <div key={idx} className="movies__movie">

                    {/*<img className="movies__poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`: "https://i.ibb.co/gy133B0/poster.jpg"} alt="movie poster"/>*/}
                    {movie.poster_path
                        ? <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                        : <div className="movies__placeholder movies__poster">{movie.title}</div>}
                    <div className="movies__overlay row">Add to favourites</div>

                </div>
            ))}
        </div>

    )
}

export default MovieList;