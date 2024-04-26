import React from "react";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Simple email validation function
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    if (!email) {
      setErrorMessage("Please enter the email.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      setTimeout(() => {
        setSubscribed(false);
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      setEmail("");
      await axios.post("http://localhost:5000/api/userEmail", { email });
      setSubscribed(true);
      setPopupMessage("Subscribed successfully!");
      setTimeout(() => {
        setSubscribed(false);
        setPopupMessage("");
      }, 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Already subscribed"
      ) {
        setErrorMessage("Already subscribed.");
        setTimeout(() => {
        setSubscribed(false);
        setErrorMessage("");
      }, 3000);
      } else {
        console.error("Error subscribing:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  // Popup message component
  const PopupMessage = ({ message }) => (
    <div
      className="alert alert-success mt-3"
      role="alert"
      style={{
        color: "#000",
        backgroundColor: "#fcd7ac",
        borderColor: "#e88f2a",
      }}
    >
      {message}
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div
      className="alert alert-danger mt-3"
      role="alert"
      style={{
        color: "#000",
        backgroundColor: "#fcd7ac",
        borderColor: "#e88f2a",
      }}
    >
      {message}
    </div>
  );

  return (
    <div className="container-fluid footer text-white mt-5 pt-5 px-0 position-relative overlay-top">
      <div className="row mx-0 pt-5 px-sm-3 px-lg-5 mt-4">
        <div className="col-lg-3 col-md-6 mb-5">
          <h4
            className="text-white text-uppercase mb-4"
            style={{ letterSpacing: "3px" }}
          >
            Get In Touch
          </h4>
          <p>
            <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New York,
            USA
          </p>
          <p>
            <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
          </p>
          <p className="m-0">
            <i className="fa fa-envelope mr-2"></i>info@example.com
          </p>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <h4
            className="text-white text-uppercase mb-4"
            style={{ letterSpacing: "3px" }}
          >
            Follow Us
          </h4>
          <p>Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
          <div className="d-flex justify-content-start">
            <a
              className="btn btn-lg btn-outline-light btn-lg-square mr-2"
              href="#"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-lg btn-outline-light btn-lg-square mr-2"
              href="#"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-lg btn-outline-light btn-lg-square mr-2"
              href="#"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-lg btn-outline-light btn-lg-square" href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <h4
            className="text-white text-uppercase mb-4"
            style={{ letterSpacing: "3px" }}
          >
            Open Hours
          </h4>
          <div>
            <h6 className="text-white text-uppercase">Monday - Friday</h6>
            <p>8.00 AM - 8.00 PM</p>
            <h6 className="text-white text-uppercase">Saturday - Sunday</h6>
            <p>2.00 PM - 8.00 PM</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <h4
            className="text-white text-uppercase mb-4"
            style={{ letterSpacing: "3px" }}
          >
            Newsletter
          </h4>
          <p>Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
          <div className="w-100">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-light"
                style={{ padding: "25px" }}
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary font-weight-bold px-3"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* Display success message if subscribed */}
          {popupMessage && <PopupMessage message={popupMessage} />}

          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      </div>
      <div
        className="container-fluid text-center text-white border-top mt-4 py-4 px-sm-3 px-md-5"
        style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
      >
        <p className="mb-2 text-white">
          Copyright &copy;{" "}
          <a className="font-weight-bold" href="#">
            Domain
          </a>
          . All Rights Reserved.
        </p>
        <p className="m-0 text-white">
          Designed by{" "}
          <a className="font-weight-bold" href="#">
            Renuka with ❤
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
