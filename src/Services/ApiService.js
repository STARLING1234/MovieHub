import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const getPopularMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

const getTrendingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

const getUpcomingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        throw error;
    }
};

const getTrendingTvShows = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/tv/day`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

const getPopularTvShows = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/popular`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

const searchMovies = async (query, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

const getMediaDetails = async (mediaType, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${mediaType} details:`, error);
        throw error;
    }
};

const getMediaTrailer = async (mediaType, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${mediaType}/${id}/videos`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${mediaType} details:`, error);
        throw error;
    }
};


const getMediaCasts = async (mediaType, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${mediaType}/${id}/credits`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${mediaType} casts details:`, error);
        throw error;
    }
};

const getPersonDetails = async (personId) => {
    try {
        const response = await axios.get(`${BASE_URL}/person/${personId}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching person details:', error);
        throw error;
    }
};

const getPersonMovieCredits = async (personId) => {
    try {
        const response = await axios.get(`${BASE_URL}/person/${personId}/movie_credits`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching person movie credits:', error);
        throw error;
    }
};

export { getPopularMovies, getTrendingMovies, getUpcomingMovies, getTrendingTvShows, getPopularTvShows, searchMovies, getMovieDetails, getMediaDetails, getMediaTrailer, getMediaCasts, getPersonDetails, getPersonMovieCredits };
