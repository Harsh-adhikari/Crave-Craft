import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

export default function Footer() {
  // Replace this with your actual Google Form link
  const feedbackFormLink = "https://forms.gle/YOUR_FORM_ID_HERE";

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Top Section: Logo/Brand */}
        <div className="footer-brand">
          <h3>Crave Craft</h3>
          <p className="footer-tagline">Share recipes, share love 🍳</p>
        </div>

        {/* Middle Section: Social Links */}
        <div className="footer-social">
          <p className="footer-subtitle">Connect with us</p>
          <div className="social-icons">
            <a
              href="https://x.com/HarshAdhik16222"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon twitter"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/harsh-adhikari1001/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/harsh_adhikari010/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Harsh-adhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon github"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Feedback Button */}
        <div className="footer-feedback">
          <a
            href={"https://docs.google.com/forms/d/e/1FAIpQLSfX_JUVPZuVG-nVLDxyWDjBN_urrjITNca_jim6prZ8GF_9Eg/viewform?usp=sf_link"}
            target="_blank"
            rel="noopener noreferrer"
            className="feedback-button"
          >
            <MdFeedback />
            <span>Send Feedback</span>
          </a>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-bottom">
          <p className="copyright">© 2025 Created by Harsh Adhikari</p>
          <p className="tagline">Building clean and modern web experiences.</p>
          <p className="rights">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
