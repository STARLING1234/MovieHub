import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { SearchContext } from "../../Context/SearchContext";
import { toast } from "react-toastify";
import Tooltip from "../../Components/UIComponents/Tooltip";
import "./index.scss";

const index = ({ sidebarOpen, setSidebarOpen }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine whether to hide the search bar
    const shouldHideSearch =
        location.pathname.startsWith("/movie/") ||
        location.pathname.startsWith("/tv/") ||
        location.pathname.startsWith("/person/");

    // Clear local input when search query is cleared globally
    useEffect(() => {
        if (!searchQuery) {
            setInputValue("");
        }
    }, [searchQuery]);

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/");
        window.location.reload();
    };

    const handleSearch = () => {
        setSearchQuery(inputValue.trim());
        setOpen(false);
    };

    const handleMobileLinkClick = (e, path) => {
        e.preventDefault();
        setSearchQuery("");
        setInputValue("");
        setOpen(false);
        navigate(path);
    };

    return (
        <nav className={`navbar ${open ? "mobile-open" : ""}`}>
            <div className="header-left">
                <Link to='/popular-movies'>
                    <div className="logo">
                        <img src="/MovieHub_Logo.png" alt="MovieHub" />
                    </div>
                </Link>

                {/* Desktop Sidebar Toggle Button */}
                <Tooltip content={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"} position="bottom">
                    <button
                        className="sidebar-toggle-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </Tooltip>
            </div>

            {/* Desktop & Mobile Dropdown/Inline Elements */}
            <div className={`navbar-menu-container ${open ? "active" : ""}`}>
                <ul className="nav-links">
                    <li><a href="/popular-movies" onClick={(e) => handleMobileLinkClick(e, "/popular-movies")}>Popular Movies</a></li>
                    <li><a href="/upcoming-movies" onClick={(e) => handleMobileLinkClick(e, "/upcoming-movies")}>Upcoming Movies</a></li>
                    <li><a href="/trending-movies" onClick={(e) => handleMobileLinkClick(e, "/trending-movies")}>Trending Movies</a></li>
                    <li><a href="/trending-tv" onClick={(e) => handleMobileLinkClick(e, "/trending-tv")}>Trending TV Shows</a></li>
                    <li><a href="/popular-tv" onClick={(e) => handleMobileLinkClick(e, "/popular-tv")}>Popular TV Shows</a></li>
                </ul>

                {!shouldHideSearch && (
                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button className="search-icon-btn" onClick={handleSearch} aria-label="Search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="header-right-actions">
                {/* Dark/Light Toggle Button */}
                <Tooltip content={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} position="bottom">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <i className="fa-solid fa-sun text-warning"></i>
                        ) : (
                            <i className="fa-solid fa-moon"></i>
                        )}
                    </button>
                </Tooltip>

                {/* Logout Button */}
                <Tooltip content="Sign Out" position="bottom">
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </Tooltip>

                {/* Mobile Menu Toggle Icon */}
                <div
                    className="menu-icon"
                    onClick={() => setOpen(!open)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default index;