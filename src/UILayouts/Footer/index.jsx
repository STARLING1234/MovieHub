import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.scss";

const index = () => {
    const { setSearchQuery } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleLinkClick = (e, path) => {
        e.preventDefault();
        setSearchQuery("");
        navigate(path);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Link to='/popular-movies'>
                        <img src="/MovieHub_Logo.png" alt="MovieHub" />
                    </Link>
                    <p>
                        Discover trending, popular and upcoming movies.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Movies</h3>
                    <a href="/popular-movies" onClick={(e) => handleLinkClick(e, "/popular-movies")}>Popular Movies</a>
                    <a href="/upcoming-movies" onClick={(e) => handleLinkClick(e, "/upcoming-movies")}>Upcoming Movies</a>
                    <a href="/trending-movies" onClick={(e) => handleLinkClick(e, "/trending-movies")}>Trending Movies</a>
                    <a href="/trending-tv" onClick={(e) => handleLinkClick(e, "/trending-tv")}>Trending TV Shows</a>
                    <a href="/popular-tv" onClick={(e) => handleLinkClick(e, "/popular-tv")}>Popular TV Shows</a>
                </div>

                <div className="footer-links">
                    <h3>Support</h3>

                    <a href="/about" onClick={(e) => handleLinkClick(e, "/about")}>About</a>
                    <a href="/contact" onClick={(e) => handleLinkClick(e, "/contact")}>Contact</a>
                    <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, "/privacy-policy")}>Privacy Policy</a>
                    <a href="/terms-of-service" onClick={(e) => handleLinkClick(e, "/terms-of-service")}>Terms</a>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>

                    <div className="social-icons">
                        <a href="#">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="#">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="copyright">
                © {new Date().getFullYear()} MovieHub. All rights reserved.
            </div>
        </footer>
    )
}

export default index;