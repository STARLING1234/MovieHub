import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonDetails, getPersonMovieCredits } from '../../Services/ApiService';
import { ThemeContext } from '../../Context/ThemeContext';
import { PersonDetailsSkeleton } from '../../Components/UIComponents/SkeletonTheme/DetailsSkeleton';
import { Card, CardImage, CardTitle, CardDesc } from '../../Components/Card';
import Pagination from '../../Components/Pagination';
import './index.scss';

const PersonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [person, setPerson] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of movies per page

    useEffect(() => {
        const fetchPersonData = async () => {
            setLoading(true);
            try {
                const [personData, creditsData] = await Promise.all([
                    getPersonDetails(id),
                    getPersonMovieCredits(id)
                ]);
                setPerson(personData);
                
                // Sort movies by release_date descending, if available
                const sortedMovies = (creditsData.cast || []).sort((a, b) => {
                    const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
                    const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
                    return dateB - dateA;
                });
                setMovies(sortedMovies);
                setCurrentPage(1); // Reset page to 1 on person change
            } catch (error) {
                console.error("Failed to fetch person details or credits:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonData();
    }, [id]);

    if (loading) {
        return <PersonDetailsSkeleton />;
    }

    if (!person) {
        return (
            <div className="error-container">
                <h2>Person Details Not Found 🎬</h2>
                <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
            </div>
        );
    }

    const profileUrl = person.profile_path 
        ? `https://image.tmdb.org/t/p/original${person.profile_path}` 
        : '';

    // Calculate pagination slices
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="person-detail-page">
            <div className="page-header">
                <button className="back-nav-btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>
            </div>

            <div className="person-container">
                {/* Left Profile Sidebar */}
                <div className="profile-sidebar">
                    <div className="profile-img-wrapper">
                        {profileUrl ? (
                            <img src={profileUrl} alt={person.name} className="profile-img" />
                        ) : (
                            <div className="no-profile-img">
                                <i className="fa-solid fa-user"></i>
                            </div>
                        )}
                    </div>

                    <h1 className="person-name-mobile">{person.name}</h1>

                    <div className="personal-info">
                        <h3>Personal Info</h3>
                        
                        {person.known_for_department && (
                            <div className="info-item">
                                <strong>Known For</strong>
                                <span>{person.known_for_department}</span>
                            </div>
                        )}

                        {person.birthday && (
                            <div className="info-item">
                                <strong>Birthday</strong>
                                <span>{person.birthday}</span>
                            </div>
                        )}

                        {person.place_of_birth && (
                            <div className="info-item">
                                <strong>Place of Birth</strong>
                                <span>{person.place_of_birth}</span>
                            </div>
                        )}

                        {person.popularity > 0 && (
                            <div className="info-item">
                                <strong>Popularity Score</strong>
                                <span>{person.popularity.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="profile-content">
                    <h1 className="person-name-desktop">{person.name}</h1>
                    
                    <div className="biography-section">
                        <h2>Biography</h2>
                        <p>{person.biography || `We don't have a biography for ${person.name} yet.`}</p>
                    </div>

                    {/* Movie Credits Section */}
                    {movies.length > 0 && (
                        <div className="movie-credits-section">
                            <h2>Movie Credits</h2>
                            <div className="credits-grid">
                                {currentMovies.map((movie) => {
                                    const posterUrl = movie.poster_path 
                                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                        : 'https://via.placeholder.com/500x750?text=No+Poster';
                                    
                                    return (
                                        <Card key={`${movie.id}-${movie.credit_id || Math.random()}`} onClick={() => navigate(`/movie/${movie.id}`)}>
                                            <CardImage image={posterUrl} alt={movie.title} />
                                            <CardTitle title={movie.title || movie.original_title} />
                                            <CardDesc desc={movie.character ? `as ${movie.character}` : (movie.overview ? movie.overview.slice(0, 80) + '...' : '')} />
                                        </Card>
                                    );
                                })}
                            </div>
                            <Pagination 
                                totalPages={totalPages} 
                                currentPage={currentPage} 
                                onPageChange={setCurrentPage} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;
