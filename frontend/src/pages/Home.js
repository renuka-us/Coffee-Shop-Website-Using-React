import React, { Fragment } from 'react';
import About from './About';
import Menu from './Menu'
import Testimonial from './Testimonial';
import Services from './Services';
import Reservation from './Reservation';
import BackToTopButton from '../components/BackToTop';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import axios from "axios";


function Index(){

  
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
        <Fragment>


<div className="container-fluid p-0 mb-5">
      <div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={2000}
        >
          <div>
            <img className="carousel-img w-100" src="assets/img/carousel-1.jpg" alt="Image" />
            <p className="legend d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-primary font-weight-medium m-0">We Have Been Serving</h2>
              <h1 className="display-1 text-white m-0">COFFEE</h1>
              <h2 className="text-white m-0">* SINCE 1950 *</h2>
            </p>
          </div>
          <div>
            <img className="carousel-img w-100" src="assets/img/carousel-2.jpg" alt="Image" />
            <p className="legend d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-primary font-weight-medium m-0">We Have Been Serving</h2>
              <h1 className="display-1 text-white m-0">COFFEE</h1>
              <h2 className="text-white m-0">* SINCE 1950 *</h2>
            </p>
          </div>
          <div>
            <img className="carousel-img w-100" src="assets/img/carousel-2.jpg" alt="Image" />
            <p className="legend d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-primary font-weight-medium m-0">We Have Been Serving</h2>
              <h1 className="display-1 text-white m-0">COFFEE</h1>
              <h2 className="text-white m-0">* SINCE 1950 *</h2>
            </p>
          </div>
          <div>
            <img className="carousel-img w-100" src="assets/img/carousel-2.jpg" alt="Image" />
            <p className="legend d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-primary font-weight-medium m-0">We Have Been Serving</h2>
              <h1 className="display-1 text-white m-0">COFFEE</h1>
              <h2 className="text-white m-0">* SINCE 1950 *</h2>
            </p>
          </div>
          {/* Add more carousel items as needed */}
        </Carousel>
      </div>
    </div>

    {/* <!-- Carousel End --> */}


    {/* <!-- About Start --> */}
    <About showHeader={false} />
    {/* <!-- About End --> */}


    {/* <!-- Services Start --> */}
    
    <Services showHeader={false}/>
    {/* <!-- Services End --> */}


    {/* <!-- Offer Start --> */}
    {/* <div className="offer container-fluid my-5 py-5 text-center position-relative overlay-top overlay-bottom">
      <div className="container py-5">
        <h1 className="display-3 text-primary mt-3">50% OFF</h1>
        <h1 className="text-white mb-3">Sunday Special Offer</h1>
        <h4 className="text-white font-weight-normal mb-4 pb-3">Only for Sunday from 1st Jan to 30th Jan 2045</h4>
        <form className="form-inline justify-content-center mb-4">
          <div className="input-group">
            <input type="text" className="form-control p-4" placeholder="Your Email" style={{height: '60px'}} />
            <div className="input-group-append">
              <button className="btn btn-primary font-weight-bold px-4" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div> */}
    {/* <!-- Offer Start --> */}
<div className="offer container-fluid my-5 py-5 text-center position-relative overlay-top overlay-bottom">
 <div className="container py-5">
    <h1 className="display-3 text-primary mt-3">50% OFF</h1>
    <h1 className="text-white mb-3">Sunday Special Offer</h1>
    <h4 className="text-white font-weight-normal mb-4 pb-3">Only for Sunday from 1st Jan to 30th Jan 2045</h4>
    <form className="form-inline justify-content-center mb-4" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control p-4"
          placeholder="Your Email"
          style={{height: '60px'}}
          value={email}
          onChange={handleEmailChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary font-weight-bold px-4" type="submit">Sign Up</button>
        </div>

        
      </div>
    </form>
    {/* Display error message if any */}
    {errorMessage && <ErrorMessage message={errorMessage} />}
    {/* Display success message if subscribed */}
    {popupMessage && <PopupMessage message={popupMessage} />}
 </div>
</div>
{/* <!-- Offer End --> */}

    {/* <!-- Offer End --> */}


    {/* <!-- Menu Start --> */}
    <Menu showHeader={false}/>
    {/* <!-- Menu End --> */}


    {/* <!-- Reservation Start --> */}
        <Reservation showHeader={false}/>
    {/* <!-- Reservation End --> */}


    {/* <!-- Testimonial Start --> */}
        <Testimonial showHeader={false}/>
    {/* <!-- Testimonial End --> */}

    
    {/* <!-- Back to Top --> */}
    {/* <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="fa fa-angle-double-up"></i></a> */}

    <BackToTopButton />
    {/* <!-- JavaScript Libraries --> */}
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/counterup/counterup.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>

     {/* <!-- Template Javascript --> */}
    <script src="js/main.js"></script>
        </Fragment>

    )
}

export default Index;