import React from "react";
import "./Policy.scss";

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: June 25, 2026</p>

        <section className="policy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when creating an account, such as your email address 
            and profile preferences. We do not store financial transactions or sensitive personal identities on our servers.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect to personalize your discovery experience, maintain and secure your account, 
            and send you essential service updates or password reset emails.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Cookies and Storage</h2>
          <p>
            We use local browser storage (such as LocalStorage) to keep you logged in and preserve your viewing mode preferences 
            (dark vs. light theme) between navigation actions. We do not use cookies to track your browsing habits across third-party websites.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Security</h2>
          <p>
            We take standard measures to safeguard your account metadata, utilizing Firebase Authentication protocols to process 
            login identities securely. However, no internet transmission is 100% secure.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
