import React from "react";
import AddOrRemoveFavouriteIcon from "./AddOrRemoveFavouriteIcon";



export function MoviesFavourites({favourites, removeFavouritesClick}){
    return(
        <div className="movies__row row">

            {favourites && favourites.map((favourites, idx) => (
                <div key={idx} className="movies__movie">
                    {favourites.poster_path
                        ? <img className="movies__poster" src={`https://image.tmdb.org/t/p/original/${favourites.poster_path}`} alt={favourites.title}/>
                        : <div className="movies__placeholder movies__poster">{favourites.title}</div>}
                    <div onClick={() => removeFavouritesClick(favourites)} className="movies__overlay ">Remove favourites <AddOrRemoveFavouriteIcon /> </div>
                </div>

            ))}
        </div>
    )

}