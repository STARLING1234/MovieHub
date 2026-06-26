import React, { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SkeletonLoader from "../../UIComponents/SkeletonTheme/SkeletonLoader";
import { MovieDetailsSkeleton, PersonDetailsSkeleton } from "../../UIComponents/SkeletonTheme/DetailsSkeleton";

const PrivateRoute = () => {
    const isLoggedIn = localStorage.getItem("accessToken");
    const location = useLocation();

    // Determine the fallback skeleton component based on route path
    const getFallbackSkeleton = () => {
        if (location.pathname.startsWith("/movie/") || location.pathname.startsWith("/tv/")) {
            return <MovieDetailsSkeleton />;
        }
        if (location.pathname.startsWith("/person/")) {
            return <PersonDetailsSkeleton />;
        }
        return <SkeletonLoader />;
    };

    return isLoggedIn 
        ? (
            <Suspense fallback={getFallbackSkeleton()}>
                <Outlet />
            </Suspense>
        )
        : <Navigate to="/" />;
}

export default PrivateRoute;