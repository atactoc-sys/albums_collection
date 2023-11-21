import React from "react";
import "./Footer.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div className="footerHome">
      <div className="footerContainer">
        <div className="aboutSection">
          <h4 className="about">About</h4>
          <div className="details">
            <hr />
            <p>
              The React Album Collection App is a full-stack web application
              designed to manage and showcase a collection of albums. Leveraging
              the power of React.js for the frontend and utilizing the
              JSONPlaceholder API for simulating CRUD operations, this app
              provides a seamless and interactive user experience.
            </p>
            <hr />
          </div>
        </div>
        <div className="contact">
          <h4 className="info">Contact links</h4>
          <a
            href="https://github.com/atactoc-sys"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/saikat-mandi-2595ba207/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
      <div className="bottom">
        <p>&copy; 2023 Album Collection App</p>
      </div>
    </div>
  );
}

export default Footer;
