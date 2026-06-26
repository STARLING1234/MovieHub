import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About MovieHub</h1>
        <p className="subtitle">Your ultimate destination for movies and TV show tracking.</p>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At MovieHub, we connect movie enthusiasts with the largest community database of movies, 
            TV shows, actors, and crews. Powered by the TMDB API, our goal is to provide a clean, 
            fast, and premium user experience to help you explore, review, and discover your next favorite screen title.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fa-solid fa-fire"></i>
              <h3>Trending & Popular</h3>
              <p>Stay up to date with real-time trending movies and television broadcasts.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-magnifying-glass"></i>
              <h3>Instant Search</h3>
              <p>Access thousands of movie profiles, cast entries, and movie summaries instantly.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-film"></i>
              <h3>Trailers & Casts</h3>
              <p>Watch trailers, examine cast lists, and browse detailed biographies of creators.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
