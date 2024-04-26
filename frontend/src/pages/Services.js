import React from 'react';
import PageHeader from '../components/PageHeader';
import { useState, useEffect } from 'react';

const Service = ({ showHeader = true }) => {
    const [services, setServices] = useState([]);
    const servicesPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/services');
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            {showHeader && <PageHeader title={"Services"} />}

            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="section-title">
                        <h4 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Our Services</h4>
                        <h1 className="display-4">Fresh & Organic Beans</h1>
                    </div>
                    <div className="row">
                        {currentServices.map((service, index) => (
                            <div className="col-lg-6 mb-5" key={index}>
                                <div className="row align-items-center">
                                    <div className="col-sm-5">
                                        <img className="img-fluid mb-3 mb-sm-0" src={`data:image/jpeg;base64,${service.image}`} alt="" />
                                    </div>
                                    <div className="col-sm-7">
                                        <h4><i className={`data:image/svg+xml;base64,${service.icon}`}></i></h4>
                                        <p className="m-0">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showHeader && (
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mt-4">
                                {Array.from({ length: Math.ceil(services.length / servicesPerPage) }).map((_, index) => (
                                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                        <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service;
