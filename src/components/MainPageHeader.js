import React from "react";

export default function MainPageHeader({heading,value,setSearchValue, logout, currentUser}){
    return (
        <div className="movies__header row">
            <h1 className= "movies__logo">{heading}</h1>

            <div className="row movies__header-right">
                <input
                    className="movies__header-item movies__search-box"
                    value={value}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search..."
                />
                <div className="movies__header-item movies__user">{currentUser && currentUser.email.slice(0,1).toUpperCase()}</div>
                <button className="movies__header-item movies__button-logout" onClick={logout}>Log out</button>

            </div>
        </div>
    )
}