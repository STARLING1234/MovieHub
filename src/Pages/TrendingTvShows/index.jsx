import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardImage, CardTitle, CardDesc } from '../../Components/Card'
import Pagination from '../../Components/Pagination'
import { getTrendingTvShows, searchMovies } from '../../Services/ApiService'
import { SearchContext } from '../../Context/SearchContext'
import SkeletonLoader from '../../Components/UIComponents/SkeletonTheme/SkeletonLoader'

const index = () => {

    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const { searchQuery } = useContext(SearchContext)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrendingTvShows = async () => {
            setLoading(true);
            try {
                let data;
                if (searchQuery) {
                    data = await searchMovies(searchQuery, currentPage);
                } else {
                    data = await getTrendingTvShows(currentPage);
                }
                setTrendingTvShows(data.results || []);
                setTotalPages(data.total_pages || 0);
            } catch (error) {
                console.error('Failed to fetch trending movies:', error);
                setTrendingTvShows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingTvShows();
    }, [currentPage,searchQuery]);

    return (
        <div className='Trending'>
            {loading ? (
                <SkeletonLoader />
            ) : trendingTvShows.length === 0 ? (
                <div className="no-records-container">
                    <i className="fa-solid fa-triangle-exclamation no-records-icon"></i>
                    <h2>No Records Found 🎬</h2>
                    <p>We couldn't find any results for "{searchQuery}". Try checking for typos or searching for something else!</p>
                </div>
            ) : (
                <>
                    <div className='card-mainContainer'>
                        {trendingTvShows.map((item, index) => {
                            return (
                                <Card key={item.id} onClick={() => navigate(`/tv/${item.id}`)}>
                                    <CardImage image={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                    <CardTitle title={item.original_title} />
                                    <CardDesc desc={item.overview.slice(0,100)} />
                                </Card>
                            )
                        })}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    )
}

export default index
