import React from "react";
import AddOrRemoveFavouriteIcon from "./AddOrRemoveFavouriteIcon";


export function MoviesRecommendations({handleOnClick, recommendedMovies, favourites}) {

    // function filteredMovies (){
    //     const recommendedMoviesIds = recommendedMovies.map(movie => movie.id);
    //     console.log(recommendedMoviesIds)
    //     const idsFromFavourites = favourites.map(movie => movie.id);
    //     // console.log(idsFromFavourites)
    //     const filteredByFav = recommendedMoviesIds.filter(id => !idsFromFavourites.includes(id))
    //     // console.log( filteredByFav)
    //     const uniqueIds = filteredByFav.filter((id, index) => {
    //         return filteredByFav.indexOf(id) === index
    //     });
    //     console.log(uniqueIds)
    //     const uniqueMovies = recommendedMovies.filter(movie => uniqueIds.includes(movie.id))
    //     console.log(uniqueMovies);
    //     const removeDuplicatedMovies = uniqueMovies.filter((id, index) => {
    //         return uniqueMovies.indexOf(id) === index
    //     });
    //     console.log(removeDuplicatedMovies);
    function filteredMovies (){
        return recommendedMovies.filter(movie => !favourites?.map((favMovie) => favMovie.id).includes(movie.id));
    }

        // const recommendedFilteredByFavourites = recommendedMoviesIds.filter(movie => favourites.includes(movie.id))
        // console.log(recommendedFilteredByFavourites)
        // const recommendedFilteredByDuplicates = recommendedMoviesIds.filter(movie => recommendedMoviesIds.includes(movie.id))
        // console.log(recommendedFilteredByDuplicates)
        // return recommendedFilteredByDuplicates;
        // const first = [1,2,3,4];
        // const second = [1,3,4];
        // const third = first.filter(nr => !second.includes(nr))
        // console.log(third)

    // }

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