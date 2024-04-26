import React, { useEffect, useState } from "react";
 
function BackToTop() {
    const [showButton, setShowButton] = useState(false);
 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
 
    useEffect(() => {
        const handleScroll = () => {
            // Show the button when the user has scrolled more than 300px
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
 
        // Initial check to set the initial state
        handleScroll();
 
        window.addEventListener('scroll', handleScroll);
 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount
 
    return (
        showButton && (
            <a href="#pages" className="btn btn-primary border-inner py-3 fs-4 back-to-top" style={{ zIndex: '9999', display: 'block' }} onClick={scrollToTop}>
                <i className="fa fa-arrow-up"></i>
            </a>
        )
    );
}
 
export default BackToTop;
 