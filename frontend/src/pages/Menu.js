import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

const Menu = ({ showHeader = true }) => {
  const [menuItems, setMenuItems] = useState([]);
  const menuItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();

      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const indexOfLastMenuItem = currentPage * menuItemsPerPage;
  const indexOfFirstMenuItem = indexOfLastMenuItem - menuItemsPerPage;
  const currentMenuItems = menuItems.slice(
    indexOfFirstMenuItem,
    indexOfLastMenuItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {showHeader && <PageHeader title="Menu" />}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Menu & Pricing
            </h4>
            <h1 className="display-4">Competitive Pricing</h1>
          </div>
          <div className="row">
            {currentMenuItems.map((menuItem, index) => (
              <div className="col-lg-6" key={index}>
                <div className="row align-items-center mb-5">
                  <div className="col-4 col-sm-3">
                    <img
                      className="w-100 rounded-circle mb-3 mb-sm-0"
                      src={`data:image/jpeg;base64,${menuItem.imageData}`}
                      alt={menuItem.title}
                    />
                    <h5 className="menu-price">{menuItem.price}</h5>
                  </div>
                  <div className="col-8 col-sm-9">
                    <h4>{menuItem.title}</h4>
                    <p className="m-0">{menuItem.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showHeader && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mt-4">
                {Array.from({
                  length: Math.ceil(menuItems.length / menuItemsPerPage),
                }).map((_, index) => (
                  <li
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
