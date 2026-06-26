import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ThemeContext } from '../../../Context/ThemeContext';

const SkeletonLoader = () => {
    const { theme } = useContext(ThemeContext);

    // Align skeletons to current theme colors
    const baseColor = theme === 'dark' ? '#1c1c1c' : '#e2e8f0';
    const highlightColor = theme === 'dark' ? '#2d2d2d' : '#cbd5e1';

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <div className="card-mainContainer" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', rowGap: '40px' }}>
                {Array(8).fill(0).map((_, idx) => (
                    <div 
                        key={idx} 
                        style={{ 
                            width: '280px', 
                            borderRadius: '12px', 
                            overflow: 'hidden', 
                            background: theme === 'dark' ? '#1c1c1c' : '#ffffff',
                            border: theme === 'dark' ? 'none' : '1px solid #e2e8f0',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        {/* Image Skeleton */}
                        <Skeleton height={380} width="100%" style={{ display: 'block' }} />
                        
                        {/* Text skeleton content */}
                        <div style={{ padding: '15px' }}>
                            {/* Title Skeleton */}
                            <Skeleton height={20} width="70%" style={{ marginBottom: '10px' }} />
                            {/* Description Skeleton */}
                            <Skeleton count={3} height={14} style={{ marginTop: '5px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonLoader;
