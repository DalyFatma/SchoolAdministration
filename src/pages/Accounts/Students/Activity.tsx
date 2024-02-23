import React from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Import Images
import img4 from 'assets/images/products/img-4.png'
import img6 from 'assets/images/products/img-6.png'
import img7 from 'assets/images/products/img-7.png'

const Acitivity = () => {
    return (
        <React.Fragment>
 <Row>
    <Col xxl={12} lg={6}>
        <Card>
            <Card.Header className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Student Activities</h5>
                <div className="flex-shrink-0"></div>
            </Card.Header>
            <Card.Body>
                <SimpleBar data-simplebar style={{ maxHeight: "440px" }}>
                    <div className="activity-timeline activity-main">
                        {/* Upcoming Trips and Events */}
                        <div className="activity-item d-flex">
                            <div className="flex-shrink-0 activity-avatar"></div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">School Trip to <Link to="/trip-details" className="link-secondary">Mountain Resort</Link></h6>
                                <p className="mb-2 text-muted"><small>10:00 AM - 15 Jan, 2023</small></p>
                                <p className="text-muted mb-0">Exciting trip planned to the mountain resort. Don't forget to bring your permission slip!</p>
                            </div>
                        </div>

                        {/* Next Upcoming Trip */}
                        <div className="activity-item py-3 d-flex">
                            <div className="flex-shrink-0 activity-avatar"></div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">Next Upcoming Trip to <Link to="/trip-details" className="link-secondary">Historical Museum</Link></h6>
                                <p className="mb-2 text-muted"><small>02:00 PM - 20 Jan, 2023</small></p>
                                <p className="text-muted mb-0">Prepare for an educational trip to the historical museum next week.</p>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="activity-item d-flex">
                            <div className="flex-shrink-0 activity-avatar"></div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">Important Announcement</h6>
                                <p className="mb-2 text-muted"><small>09:30 AM Today</small></p>
                                <p className="text-muted mb-0">Reminder: Parent-Teacher meetings scheduled for tomorrow. Please ensure your parents attend.</p>
                            </div>
                        </div>
                        
                    </div>
                </SimpleBar>
            </Card.Body>
        </Card>
    </Col>
</Row>


        </React.Fragment>
    );
};

export default Acitivity;