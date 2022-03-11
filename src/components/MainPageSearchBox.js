import React from "react";

export default function MainPageSearchBox({value,setSearchValue}){
    return(
        <div className="col">
            <input
                className="main__search-box"
                value={value}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search..."
            />

        </div>
    )
}