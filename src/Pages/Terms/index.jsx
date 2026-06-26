import React from "react";
import "../PrivacyPolicy/Policy.scss"; 

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: June 25, 2026</p>

        <section className="policy-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using MovieHub, you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Use of TMDB API</h2>
          <p>
            MovieHub uses the TMDB API to display movie titles, media credits, posters, and biographies. 
            However, MovieHub is not endorsed, certified, or sponsored by TMDB. You must respect TMDB's community 
            terms when browsing content.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Account Responsibility</h2>
          <p>
            You are responsible for safeguarding the credentials you use to access MovieHub and for any activities 
            conducted under your account identity. You agree not to share your account with third parties.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Limitation of Liability</h2>
          <p>
            MovieHub provides catalog contents "as is" without warranty. We are not liable for any content discrepancies, 
            service disruptions, or loss of watchlists stored inside browser caches.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
