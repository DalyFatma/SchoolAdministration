import React from 'react';
import { Card, Col, Form, Nav, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Trips from './Trips';
import NoAttandance from './NoAttandance';


const TableProfile = () => {
    const navigate = useNavigate();
    const setactiveTab =()=>{
      navigate(-1)
    }
    return (
        <React.Fragment>
            <Tab.Container defaultActiveKey="RecentOrders">
            <div className="d-flex align-items-center gap-3 mb-4">
                <Nav as="ul" className="nav nav-pills flex-grow-1 mb-0">
                    <Nav.Item as="li">
                        <Nav.Link eventKey="RecentOrders">
                            Trips
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Products">
                            Complains
                        </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item as="li">
                        <Nav.Link eventKey="Transactions">
                            Transactions
                        </Nav.Link>
                    </Nav.Item> */}
                </Nav>
{/* 
                <div className="flex-shrink-0">
                    <Link to="/students/edit-student" className="btn btn-success">Profile Edit</Link>
                </div> */}
            </div>

                <Tab.Content className="text-muted">
                    <Tab.Pane eventKey="RecentOrders">
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center gap-3">
                                {/* <h5 className="card-title mb-0 flex-grow-1">Trips</h5> */}
                                <div className="search-box mt-3 mt-sm-0">
                                    <Form.Control type="text" className="search w-md" placeholder="Search for Trips..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Card.Header>
                            <NoAttandance />
                           
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Products">
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center gap-3">
                                {/* <h5 className="card-title mb-0 flex-grow-1">Complains</h5> */}
                                <div className="search-box mt-3 mt-sm-0">
                                    <Form.Control type="text" className="search w-md" placeholder="Search for Complains..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Card.Header>
                            <Trips />
                        </Card>
                    </Tab.Pane>

                    <Col lg={12}>
                          <div className="d-flex align-items-start gap-3 mt-0 mb-4">
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none btn-label previestab"
                            onClick={() => setactiveTab()}
                          >
                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                            Back
                          </button>
                        
                        </div>
                          </Col>
                </Tab.Content>
            </Tab.Container>
        </React.Fragment>
    );
};

export default TableProfile;