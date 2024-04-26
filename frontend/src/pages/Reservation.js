import React, { useEffect,useState } from "react";
import PageHeader from "../components/PageHeader";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"; // Import styles
import axios from "axios"; // Import axios for making HTTP requests
import moment from "moment";

const Reservation = ({ showHeader = true }) => {
  const [popupMessage, setPopupMessage] = useState("");
  // useEffect(() => {
  //   if (popupMessage) {
  //      // Reset form fields if popupMessage is not empty
  //      setFormData({
  //        name: "",
  //        email: "",
  //        date: "",
  //        time: "",
  //        numberOfPeople: "",
  //      });
  //   }
  //  }, [popupMessage]);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    numberOfPeople: "",
  });
  // Add state for the keys of the Datetime components
 const [dateKey, setDateKey] = useState(0);
 const [timeKey, setTimeKey] = useState(0);
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
  // console.log(formData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
       // Make POST request to backend API endpoint
       const response = await axios.post(
         "http://localhost:5000/api/confirmReservation",
         formData
       );
       
       console.log(response.data); // Assuming the response contains a success message
       // Display reservation success message to user
       setPopupMessage("Reservation successful!");
       setTimeout(() => {
         setPopupMessage("");
       }, 3000);
    } catch (error) {
       console.error("Error submitting reservation:", error);
       // Handle error and display appropriate message to user
       setPopupMessage("Reservation failed. Please try again.");
       setTimeout(() => {
         setPopupMessage("");
       }, 3000);
    }
    // Reset form fields
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      numberOfPeople: "",
   });
   // Reset the keys of the Datetime components to force a reset
   setDateKey(prevKey => prevKey + 1);
   setTimeKey(prevKey => prevKey + 1);
   
   };
   

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (date) => {
    // Ensure that date is a Moment.js object
    const formattedDate = moment(date).format("MM/DD/YYYY");

    // Now you can use formattedDate to store in the database or wherever needed
    console.log(formattedDate);
    // const formattedDate = moment(date);
    setFormData({ ...formData, date: formattedDate });
  };

  const handleTimeChange = (time) => {
    const formattedTime = moment(time).format("hh:mm A");
    console.log(formattedTime);
    setFormData({ ...formData, time: formattedTime });
  };

  return (
    <div>
      {showHeader && <PageHeader title="Reservation" />}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="reservation position-relative overlay-top overlay-bottom">
            <div className="row align-items-center">
              <div className="col-lg-6 my-5 my-lg-0">
                <div className="p-5">
                  <div className="mb-4">
                    <h1 className="display-3 text-primary">30% OFF</h1>
                    <h1 className="text-white">For Online Reservation</h1>
                  </div>
                  <p className="text-white">
                    Lorem justo clita erat lorem labore ea, justo dolor lorem
                    ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
                    justo sed sed diam. Ea et erat ut sed diam sea
                  </p>
                  <ul className="list-inline text-white m-0">
                    <li className="py-2">
                      <i className="fa fa-check text-primary mr-3"></i>Lorem
                      ipsum dolor sit amet
                    </li>
                    <li className="py-2">
                      <i className="fa fa-check text-primary mr-3"></i>Lorem
                      ipsum dolor sit amet
                    </li>
                    <li className="py-2">
                      <i className="fa fa-check text-primary mr-3"></i>Lorem
                      ipsum dolor sit amet
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="text-center p-5"
                  style={{ background: "rgba(51, 33, 29, .8)" }}
                >
                  <h1 className="text-white mb-4 mt-5">Book Your Table</h1>
                  <form className="mb-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent border-primary p-4"
                        placeholder="Name"
                        required="required"
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control bg-transparent border-primary p-4"
                        placeholder="Email"
                        required="required"
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                    </div>

                    <div className="form-group">
                      <Datetime
                      key={dateKey} // Use the key to force a reset
                        inputProps={{
                          className:
                            "form-control bg-transparent border-primary p-4",
                          placeholder: "Date",
                        }}
                        dateFormat="MM/DD/YYYY"
                        timeFormat={false}
                        onChange={handleDateChange}
                        name="date"
                        
                      />
                    </div>
                    <div className="form-group">
                      <Datetime
                       key={timeKey} // Use the key to force a reset
                        inputProps={{
                          className:
                            "form-control bg-transparent border-primary p-4",
                          placeholder: "Time",
                        }}
                        dateFormat={false}
                        timeFormat="hh:mm A"
                        onChange={handleTimeChange}
                        name="time"
                    
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select bg-transparent border-primary px-4"
                        style={{ height: "49px" }}
                        onChange={handleInputChange}
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                      >
                        <option selected>No of people</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block font-weight-bold py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </form>
                  {/* Display success message if subscribed */}
                  {popupMessage && <PopupMessage message={popupMessage} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
