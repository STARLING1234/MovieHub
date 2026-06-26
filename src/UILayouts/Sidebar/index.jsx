import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.scss";

const index = ({ open }) => {
    const { setSearchQuery } = useContext(SearchContext);

    const handleLinkClick = () => {
        setSearchQuery("");
    };

    return (
        <aside className={`sidebar ${open ? "show" : ""}`}>

            <ul>
                <li>
                    <NavLink to="/popular-movies" end onClick={handleLinkClick}>
                        <i className="fa-solid fa-house"></i>
                        <span>Popular Movies</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/upcoming-movies" onClick={handleLinkClick}>
                        <i className="fa-solid fa-film"></i>
                        <span>Upcoming Movies</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trending-movies" onClick={handleLinkClick}>
                        <i className="fa-solid fa-fire"></i>
                        <span>Trending Movies</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trending-tv" onClick={handleLinkClick}>
                        <i className="fa-solid fa-tv"></i>
                        <span>Trending TV Shows</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/popular-tv" onClick={handleLinkClick}>
                        <i className="fa-solid fa-chart-line"></i>
                        <span>Popular TV Shows</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default index;