import React, { useState, useContext, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './UILayouts/Navbar'
import Footer from './UILayouts/Footer'
import Sidebar from './UILayouts/Sidebar'
import PrivateRoute from './Components/Auth/PrivateRoute/PrivateRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './Context/ThemeContext';
import ScrollToTop from './Components/UIComponents/ScrollToTop/ScrollToTop';
import './App.css'

// Lazy loaded page components
const PopularMovies = lazy(() => import('./Pages/PopularMovies'));
const TrendingMovies = lazy(() => import('./Pages/TrendingMovies'));
const UpcomingMovies = lazy(() => import('./Pages/UpcomingMovies'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));
const TrendTvShows = lazy(() => import('./Pages/TrendingTvShows'));
const PopularTvShows = lazy(() => import('./Pages/PopularTvShows'));
const MovieDetails = lazy(() => import('./Pages/MovieDetails'));
const PersonDetails = lazy(() => import('./Pages/PersonDetails'));
const Login = lazy(() => import('./Components/Auth/Login/Login'));
const Signup = lazy(() => import('./Components/Auth/Signup/SignUp'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const Terms = lazy(() => import('./Pages/Terms'));

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const location = useLocation();
  // check login token
  const isLoggedIn = localStorage.getItem("accessToken");

  // hide Navbar/Footer pages
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/signup";

  return (
    <div>
      <ScrollToTop />
      {
        !hideLayout && isLoggedIn &&
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </>
      }

      <div className={hideLayout ? 'auth-layout' : `main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Suspense fallback={null}>
          <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/popular-movies" element={<PopularMovies />} />
              <Route path="/upcoming-movies" element={<UpcomingMovies />} />
              <Route path="/trending-movies" element={<TrendingMovies />} />
              <Route path="/trending-tv" element={<TrendTvShows />} />
              <Route path="/popular-tv" element={<PopularTvShows />}  />
              <Route path="/movie/:id" element={<MovieDetails mediaType="movie" />}  />
              <Route path="/tv/:id" element={<MovieDetails mediaType="tv" />}  />
              <Route path="/person/:id" element={<PersonDetails />}  />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<Terms />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
        {
          !hideLayout && isLoggedIn &&
          <Footer />
        }
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme={theme} />
    </div>
  )
}

export default App
