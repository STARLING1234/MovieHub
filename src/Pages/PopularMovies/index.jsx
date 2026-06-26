import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, CardImage, CardTitle, CardDesc } from '../../Components/Card'
import { getPopularMovies, searchMovies } from '../../Services/ApiService'
import { SearchContext } from '../../Context/SearchContext'
import SkeletonLoader from '../../Components/UIComponents/SkeletonTheme/SkeletonLoader'

const index = () => {
    const [popularData, setPopularData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const { searchQuery } = useContext(SearchContext);
    const navigate = useNavigate();

    // Reset list and set currentPage to 1 when searchQuery changes
    useEffect(() => {
        setPopularData([]);
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (currentPage === 1) {
                setLoading(true);
            }
            try {
                let data;
                if (searchQuery) {
                    data = await searchMovies(searchQuery, currentPage);
                } else {
                    data = await getPopularMovies(currentPage);
                }
                
                const results = data.results || [];
                setPopularData((prev) => (currentPage === 1 ? results : [...prev, ...results]));
                setTotalPages(data.total_pages || 0);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage, searchQuery]);

    const fetchMoreData = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className='Home'>
            {loading && popularData.length === 0 ? (
                <SkeletonLoader />
            ) : popularData.length === 0 ? (
                <div className="no-records-container">
                    <i className="fa-solid fa-triangle-exclamation no-records-icon"></i>
                    <h2>No Records Found 🎬</h2>
                    <p>We couldn't find any results for "{searchQuery}". Try checking for typos or searching for something else!</p>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={popularData.length}
                    next={fetchMoreData}
                    hasMore={currentPage < totalPages}
                    loader={<h4 style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-color)' }}>Loading more movies...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-color)' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className='card-mainContainer'>
                        {popularData.map((item, idx) => {
                            return (
                                <Card key={`${item.id}-${idx}`} onClick={() => navigate(`/movie/${item.id}`)}>
                                    <CardImage image={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                    <CardTitle title={item.original_title} />
                                    <CardDesc desc={item.overview.slice(0, 100)} />
                                </Card>
                            )
                        })}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    )
}

export default index
