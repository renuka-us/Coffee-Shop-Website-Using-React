import PageHeader from '../components/PageHeader';
import React, { useState } from 'react';
import axios from 'axios';

const Contact = ({ showHeader = true}) => {
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState(''); // New state for popup message

  const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent form submission

      // Regex patterns
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Get form elements
      const nameInput = event.target.elements.name;
      const emailInput = event.target.elements.email;
      const subjectInput = event.target.elements.subject;
      const messageInput = event.target.elements.message;

      // Validate inputs
      let newErrors = {};

      if (!nameInput.value.trim()) {
          newErrors.name = 'Please enter your name.';
      }

      if (!emailRegex.test(emailInput.value)) {
          newErrors.email = 'Please enter a valid email address.';
      }

      if (!subjectInput.value.trim()) {
          newErrors.subject = 'Please enter a subject.';
      }

      if (!messageInput.value.trim()) {
          newErrors.message = 'Please enter a message.';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
         
          try {
              const response = await axios.post('http://localhost:5000/api/submit-contact-form', {
                  name: nameInput.value,
                  email: emailInput.value,
                  subject: subjectInput.value,
                  message: messageInput.value
              });
              console.log('Form submitted successfully', response.data);
              setErrors({});
              setPopupMessage('Form submitted successfully!'); // Set popup message
              // Reset form fields
              nameInput.value = '';
              emailInput.value = '';
              subjectInput.value = '';
              messageInput.value = '';

              setTimeout(()=> setPopupMessage(''), 5000);

          } catch (error) {
              console.error('Error submitting form', error);
              setPopupMessage('Error submitting form. Please try again.'); // Set popup message for error
          }
      }
  };

  // Popup message component
  const PopupMessage = ({ message }) => (
      <div className="alert alert-success mt-3" role="alert" style={{color: "#000", backgroundColor: "#fcd7ac", borderColor: "#e88f2a"}}>
          {message}
      </div>
  );


  
  return (
    <div>
    
      {showHeader && <PageHeader title="Contact" />}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Contact Us
            </h4>
            <h1 className="display-4">Feel Free To Contact</h1>
          </div>
          <div className="row px-3 pb-2">
            <div className="col-sm-4 text-center mb-3">
              <i className="fa fa-2x fa-map-marker-alt mb-3 text-primary"></i>
              <h4 className="font-weight-bold">Address</h4>
              <p>123 Street, New York, USA</p>
            </div>
            <div className="col-sm-4 text-center mb-3">
              <i className="fa fa-2x fa-phone-alt mb-3 text-primary"></i>
              <h4 className="font-weight-bold">Phone</h4>
              <p>+012 345 6789</p>
            </div>
            <div className="col-sm-4 text-center mb-3">
              <i className="far fa-2x fa-envelope mb-3 text-primary"></i>
              <h4 className="font-weight-bold">Email</h4>
              <p>info@example.com</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pb-5">
              <iframe
                style={{ width: "100%", height: "443px", border: "0" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                frameBorder="0"
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
            <div className="col-md-6 pb-5">
              <div className="contact-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" noValidate onSubmit={handleSubmit}>
                {popupMessage && <PopupMessage message={popupMessage} />}
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control bg-transparent p-4"
                      id="name"
                      placeholder="Your Name"
                      required
                      data-validation-required-message="Please enter your name"
                      name="name"
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <input
                      type="email"
                      className="form-control bg-transparent p-4"
                      id="email"
                      placeholder="Your Email"
                      required
                      name="email"
                      data-validation-required-message="Please enter your email"

                    />
                     {errors.email && <div className="text-danger">{errors.email}</div>}
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control bg-transparent p-4"
                      id="subject"
                      placeholder="Subject"
                      required
                      name="subject"
                      data-validation-required-message="Please enter a subject"
                    />
                     {errors.subject && <div className="text-danger">{errors.subject}</div>}
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <textarea
                      className="form-control bg-transparent py-3 px-4"
                      rows="5"
                      id="message"
                      placeholder="Message"
                      required
                      name="message"
                      data-validation-required-message="Please enter your message"
                    ></textarea>
                    {errors.message && <div className="text-danger">{errors.message}</div>}
                    <p className="help-block text-danger"></p>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary font-weight-bold py-3 px-5"
                      type="submit"
                      id="sendMessageButton"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Contact;
