import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Thank you for reaching out! We will get back to you shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="subtitle">Got questions or feedback? We'd love to hear from you.</p>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Fill out the form and our support crew will reach out to you within 24 hours.</p>
            
            <div className="info-list">
              <div className="info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <p>support@moviehub.com</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <strong>Office</strong>
                  <p>123 Hollywood Blvd, Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
