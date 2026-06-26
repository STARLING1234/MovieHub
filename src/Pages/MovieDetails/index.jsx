import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import YouTube from 'react-youtube';
import { getMediaDetails, getMediaTrailer, getMediaCasts } from '../../Services/ApiService';
import { ThemeContext } from '../../Context/ThemeContext';
import { MovieDetailsSkeleton } from '../../Components/UIComponents//SkeletonTheme/DetailsSkeleton';
import MovieTrailerModal from '../../Components/Modal/MovieTrailerModal'
import useModal from '../../Hooks/useModal';
import './index.scss';

const MovieDetails = ({ mediaType = 'movie' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState({});
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true);

    const { isOpen, handleClose, handleOpen, handleToggle } = useModal();
    useEffect(() => {
        const fetchAllDetails = async () => {
            setLoading(true);
            try {
                const [detailsData, trailerData, castsData] = await Promise.all([
                    getMediaDetails(mediaType, id),
                    getMediaTrailer(mediaType, id),
                    getMediaCasts(mediaType, id)
                ]);

                setMovie(detailsData);

                const videoTrailer = trailerData.results?.find(
                    (video) =>
                        video.site === "YouTube" &&
                        video.type === "Trailer" ||
                        video.type === "Teaser"
                );
                setTrailer(videoTrailer || {});

                setCast(castsData.cast ? castsData.cast.slice(0, 7) : []);
            } catch (error) {
                console.error(`Failed to fetch ${mediaType} information:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllDetails();
    }, [id, mediaType]);

    if (loading) {
        return <MovieDetailsSkeleton />;
    }

    if (!movie) {
        return (
            <div className="error-container">
                <h2>Details Not Found 🎬</h2>
                <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
            </div>
        );
    }

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : '';
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : '';

    // Handle movie/tv API differences dynamically
    const displayTitle = movie.title || movie.name || movie.original_title || movie.original_name;
    const displayDate = movie.release_date || movie.first_air_date;
    const displayRuntime = movie.runtime || (movie.episode_run_time && movie.episode_run_time[0]);

    return (
        <div className="movie-detail-page">
            {/* Hero Backdrop Section */}
            <div
                className="backdrop-hero"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), var(--bg-color)), url(${backdropUrl})` }}
            >
                <button className="back-nav-btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>
            </div>

            {/* Main Content Details Grid */}
            <div className="content-container">
                <div className="poster-wrapper">
                    {posterUrl ? (
                        <img src={posterUrl} alt={displayTitle} className="movie-poster" />
                    ) : (
                        <div className="no-poster">No Image Available</div>
                    )}
                </div>

                <div className="info-wrapper">
                    <h1 className="movie-title">
                        {displayTitle}
                    </h1>

                    {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}

                    <div className="meta-info">
                        <span className="rating-badge">
                            <i className="fa-solid fa-star text-warning"></i> {movie.vote_average?.toFixed(1)}
                        </span>
                        {displayRuntime > 0 && (
                            <span className="runtime">
                                <i className="fa-solid fa-clock"></i> {displayRuntime} min
                            </span>
                        )}
                        {displayDate && (
                            <span className="release-date">
                                <i className="fa-solid fa-calendar"></i> {displayDate}
                            </span>
                        )}
                    </div>

                    <div className="genres-list">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="genre-pill">{genre.name}</span>
                        ))}
                    </div>

                    <div className="overview-section">
                        <h3>Overview</h3>
                        <p>{movie.overview || "No overview available."}</p>
                    </div>

                    <div className="additional-details">
                        {movie.budget > 0 && (
                            <div className="detail-item">
                                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                            </div>
                        )}
                        {movie.revenue > 0 && (
                            <div className="detail-item">
                                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                            </div>
                        )}
                        {movie.original_language && (
                            <div className="detail-item">
                                <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
                            </div>
                        )}
                        {movie.status && (
                            <div className="detail-item">
                                <strong>Status:</strong> {movie.status}
                            </div>
                        )}
                    </div>

                    {
                        Object.keys(trailer).length > 0 && (
                            <div className="trailer-btn-wrapper">
                                <button
                                    className="trailer-btn"
                                    onClick={handleOpen}
                                >
                                    <i className="fa-solid fa-play"></i>
                                    Watch Trailer
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="cast-section">
                <h2>Cast</h2>
                <div className="cast-container">
                    {cast?.map((item) => (
                        <div
                            key={item.id}
                            className="cast-card"
                            onClick={() => navigate(`/person/${item.id}`)}
                        >
                            {item.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                                    alt={item.name}
                                    className="cast-img"
                                />
                            ) : (
                                <div className="no-cast-img">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                            )}
                            <div className="cast-info">
                                <span className="cast-name">{item.name}</span>
                                <span className="cast-character">{item.character}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                isOpen && <MovieTrailerModal isOpen={isOpen} onClose={handleClose} title={"Watch Trailer"}>
                    <YouTube videoId={trailer?.key} />
                </MovieTrailerModal>
            }
        </div>

    );
};

export default MovieDetails;
