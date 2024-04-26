import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function toggleNavbarMethod() {
      const navbarDropdowns = document.querySelectorAll(".navbar .dropdown");

      // Function to handle mouseover event
      function handleMouseOver() {
        const dropdownToggle = this.querySelector(".dropdown-toggle");
        dropdownToggle.click();
      }

      // Function to handle mouseout event
      function handleMouseOut() {
        const dropdownToggle = this.querySelector(".dropdown-toggle");
        dropdownToggle.click();
        dropdownToggle.blur();
      }

      if (window.innerWidth > 992) {
        navbarDropdowns.forEach((dropdown) => {
          dropdown.addEventListener("mouseover", handleMouseOver);
          dropdown.addEventListener("mouseout", handleMouseOut);
        });
      } else {
        navbarDropdowns.forEach((dropdown) => {
          dropdown.removeEventListener("mouseover", handleMouseOver);
          dropdown.removeEventListener("mouseout", handleMouseOut);
        });
      }
    }

    toggleNavbarMethod();

    window.addEventListener("resize", toggleNavbarMethod);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", toggleNavbarMethod);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // Function to determine if a link should be active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };


  return (
    // <div class="container-fluid p-0 nav-bar">
    // <nav className={`navbar navbar-expand-lg bg-none navbar-dark py-3`}>
    //   <Link to="/" className="navbar-brand px-lg-4 m-0">
    //     <h1 className="m-0 display-4 text-uppercase text-white">KOPPEE</h1>
    //   </Link>
    //   <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div
    //     className={`collapse navbar-collapse justify-content-between ${
    //       isOpen ? "show" : ""
    //     }`}
    //     id="navbarCollapse"
    //   >
    //     <div className="navbar-nav ml-auto p-4">
    //       <Link to="/" className="nav-item nav-link active">
    //         Home
    //       </Link>
    //       <Link to="/about" className="nav-item nav-link">
    //         About
    //       </Link>
    //       <Link to="/services" className="nav-item nav-link">
    //         Service
    //       </Link>
    //       <Link to="/menu" className="nav-item nav-link">
    //         Menu
    //       </Link>
    //       <div className="nav-item dropdown">
    //         <Link
    //           to="#pages"
    //           className="nav-link dropdown-toggle"
    //           id="pagesDropdown"
    //           role="button"
    //           onClick={toggleDropdown}
    //           aria-expanded={isDropdownOpen}
    //         >
    //           Pages
    //         </Link>
    //         <div
    //           className={`dropdown-menu m-0 ${isDropdownOpen ? "show" : ""}`}
    //           aria-labelledby="pagesDropdown"
    //         >
    //           <Link to="/reservation" className="dropdown-item">
    //             Reservation
    //           </Link>
    //           <Link to="/testimonial" className="dropdown-item">
    //             Testimonial
    //           </Link>
    //         </div>
    //       </div>
    //       <Link to="/contact" className="nav-item nav-link">
    //         Contact
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
    // </div>

    <div className="container-fluid p-0 nav-bar">
      <nav className={`navbar navbar-expand-lg bg-none navbar-dark py-3`}>
        <Link to="/" className="navbar-brand px-lg-4 m-0">
          <h1 className="m-0 display-4 text-uppercase text-white">KOPPEE</h1>
        </Link>
        <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-between ${
            isOpen ? "show" : ""
          }`}
          id="navbarCollapse"
        >
          <div className="navbar-nav ml-auto p-4">
            <Link to="/" className={`nav-item nav-link ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-item nav-link ${isActive("/about")}`}>
              About
            </Link>
            <Link to="/services" className={`nav-item nav-link ${isActive("/services")}`}>
              Service
            </Link>
            <Link to="/menu" className={`nav-item nav-link ${isActive("/menu")}`}>
              Menu
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="#pages"
                className={`nav-link dropdown-toggle ${isActive("/reservation") || isActive("/testimonial")}`}
                id="pagesDropdown"
                role="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                Pages
              </Link>
              <div
                className={`dropdown-menu m-0 ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="pagesDropdown"
              >
                <Link to="/reservation" className={`dropdown-item ${isActive("/reservation")}`}>
                  Reservation
                </Link>
                <Link to="/testimonial" className={`dropdown-item ${isActive("/testimonial")}`}>
                  Testimonial
                </Link>
              </div>
            </div>
            <Link to="/contact" className={`nav-item nav-link ${isActive("/contact")}`}>
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
