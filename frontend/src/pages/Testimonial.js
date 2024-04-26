import React from "react";
import PageHeader from "../components/PageHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Testimonial = ({ showHeader = true }) => {
  const [testimonials, setTestimonials] = useState([]);
  const displayedMenuItems = !showHeader
    ? testimonials.slice(0, 4)
    : testimonials;

  useEffect(() => {
    // Fetch testimonials data from the backend API
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/testimonials"); // Replace '/api/testimonials' with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  console.log(testimonials);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      {showHeader && <PageHeader title="Testimonial" />}

      <div className="container-fluid py-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Testimonial
            </h4>
            <h1 className="display-4">Our Clients Say</h1>
          </div>
          <Slider {...settings} className="testimonial-carousel">
            {displayedMenuItems.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-item d-flex flex-column align-items-center justify-content-center"
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid"
                    src={`data:image/jpeg;base64,${testimonial.photo}`}
                    alt={testimonial.title}
                  />
  
                  <div className="ml-3">
                    <h4>{testimonial.clientName}</h4>
                    <i>{testimonial.profession}</i>
                    
                  </div>
                  
                </div>
                <p className="mb-4">{testimonial.review}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <div className="container-fluid py-5">
      <div className="container">
        <div className="section-title">
          <h4 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Testimonial</h4>
          <h1 className="display-4">Our Clients Say</h1>
        </div>
        <Slider {...settings} className="testimonial-carousel">
          <div className="testimonial-item d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center mb-3">
              <img className="img-fluid" src="assets/img/testimonial-1.jpg" alt="" />
              <div className="ml-3">
                <h4>Client Name</h4>
                <i>Profession</i>
              </div>
            </div>
            <p className="m-0">Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita</p>
          </div>
          <div className="testimonial-item d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center mb-3">
              <img className="img-fluid" src="assets/img/testimonial-2.jpg" alt="" />
              <div className="ml-3">
                <h4>Client Name</h4>
                <i>Profession</i>
              </div>
            </div>
            <p className="m-0">Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita</p>
          </div>
          <div className="testimonial-item d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center mb-3">
              <img className="img-fluid" src="assets/img/testimonial-3.jpg" alt="" />
              <div className="ml-3">
                <h4>Client Name</h4>
                <i>Profession</i>
              </div>
            </div>
            <p className="m-0">Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita</p>
          </div>
          
        </Slider>
      </div>
    </div> */}
    </>
  );
};

export default Testimonial;
