import React, {useState, useEffect, useContext}  from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardImage, CardTitle, CardDesc } from '../../Components/Card'
import Pagination from '../../Components/Pagination'
import { getUpcomingMovies, searchMovies } from '../../Services/ApiService'
import { SearchContext } from '../../Context/SearchContext'
import SkeletonLoader from '../../Components/UIComponents/SkeletonTheme/SkeletonLoader'

const index = () => {

    const [upcomingData, setUpcomingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const { searchQuery } = useContext(SearchContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            setLoading(true);
            try {
                let data;
                if (searchQuery) {
                    data = await searchMovies(searchQuery, currentPage);
                } else {
                    data = await getUpcomingMovies(currentPage);
                }
                setUpcomingData(data.results || []);
                setTotalPages(data.total_pages || 0);
            } catch (error) {
                console.error('Failed to fetch upcoming movies:', error);
                setUpcomingData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingMovies();
    }, [currentPage, searchQuery]);

    return (
        <div className='Upcoming'>
            {loading ? (
                <SkeletonLoader />
            ) : upcomingData.length === 0 ? (
                <div className="no-records-container">
                    <i className="fa-solid fa-triangle-exclamation no-records-icon"></i>
                    <h2>No Records Found 🎬</h2>
                    <p>We couldn't find any results for "{searchQuery}". Try checking for typos or searching for something else!</p>
                </div>
            ) : (
                <>
                    <div className='card-mainContainer'>
                        {upcomingData.map((item, index) => {
                            return (
                                <Card key={item.id} onClick={() => navigate(`/movie/${item.id}`)}>
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
