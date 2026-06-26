import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ThemeContext } from '../../../Context/ThemeContext';

export const MovieDetailsSkeleton = () => {
    const { theme } = useContext(ThemeContext);

    const baseColor = theme === 'dark' ? '#1c1c1c' : '#e2e8f0';
    const highlightColor = theme === 'dark' ? '#2d2d2d' : '#cbd5e1';

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <div className="movie-detail-page skeleton-details-page" style={{ paddingBottom: '50px' }}>
                {/* Hero Backdrop Placeholder */}
                <div style={{ height: '380px', width: '100%', marginBottom: '30px', background: theme === 'dark' ? '#121212' : '#f8fafc' }}>
                    <Skeleton height="100%" width="100%" />
                </div>

                <div className="content-container" style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto', padding: '0 30px' }}>
                    {/* Poster Placeholder */}
                    <div style={{ width: '300px', flexShrink: 0 }}>
                        <Skeleton height={450} borderRadius={16} />
                    </div>

                    {/* Info Content Placeholder */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Skeleton height={40} width="60%" />
                        <Skeleton height={20} width="40%" />
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Skeleton height={25} width={60} borderRadius={20} />
                            <Skeleton height={25} width={85} borderRadius={20} />
                            <Skeleton height={25} width={100} borderRadius={20} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <Skeleton height={30} width={80} borderRadius={20} />
                            <Skeleton height={30} width={80} borderRadius={20} />
                            <Skeleton height={30} width={80} borderRadius={20} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Skeleton height={24} width="20%" style={{ marginBottom: '10px' }} />
                            <Skeleton count={4} height={16} style={{ marginBottom: '8px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export const PersonDetailsSkeleton = () => {
    const { theme } = useContext(ThemeContext);

    const baseColor = theme === 'dark' ? '#1c1c1c' : '#e2e8f0';
    const highlightColor = theme === 'dark' ? '#2d2d2d' : '#cbd5e1';

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <div className="person-detail-page skeleton-details-page" style={{ paddingBottom: '50px', paddingTop: '30px' }}>
                <div className="person-container" style={{ display: 'flex', gap: '50px', maxWidth: '1200px', margin: '0 auto', padding: '0 30px' }}>
                    {/* Sidebar Profile Image Placeholder */}
                    <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Skeleton height={480} borderRadius={16} />
                        <Skeleton height={24} width="50%" style={{ marginTop: '10px' }} />
                        <Skeleton count={4} height={16} style={{ marginBottom: '8px' }} />
                    </div>

                    {/* Content Biography / Credits Placeholder */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <Skeleton height={45} width="40%" />
                        <div>
                            <Skeleton height={24} width="20%" style={{ marginBottom: '15px' }} />
                            <Skeleton count={6} height={16} style={{ marginBottom: '8px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};
