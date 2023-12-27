import React from 'react';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Profile from './Profil';
import Trips from './Trips';
import NoAttandance from './NoAttandance';



const SingleProfile = () => {

    document.title = "No Attandance | School Administration";
    const singleAccount = useLocation()
   

    return (
        <React.Fragment>
            <div className="page-content">
                        <Card.Body>
                            <Tab.Container defaultActiveKey="arrow-profile">
                            
                                <Nav as="ul"  justify variant="pills" className="arrow-navtabs nav-success bg-light mb-4">
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="arrow-profile">
                                            <span className="d-block d-lg-none"><i className="mdi mdi-home-variant"></i></span>
                                            <span className="d-none d-lg-block">Profile</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="arrow-trips">
                                            <span className="d-block d-sm-none"><i className="mdi mdi-account"></i></span>
                                            <span className="d-none d-sm-block">Trips</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="arrow-attendance">
                                            <span className="d-block d-sm-none"><i className="mdi mdi-email"></i></span>
                                            <span className="d-none d-sm-block">Non Attendance</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item as="li">
                                        <Nav.Link eventKey="arrow-payment">
                                            <span className="d-block d-sm-none"><i className="mdi mdi-email"></i></span>
                                            <span className="d-none d-sm-block">Payment</span>
                                        </Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                                <Tab.Content className="text-muted">
                                    <Tab.Pane eventKey="arrow-profile">
                                       <Profile {...singleAccount.state}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="arrow-trips">
                                       <Trips/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="arrow-attendance">
                                       <NoAttandance/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                
                
                 
            </div>
        </React.Fragment>
    );
}

export default SingleProfile;