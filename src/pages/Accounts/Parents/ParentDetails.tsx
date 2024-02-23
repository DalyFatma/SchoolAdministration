import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Flatpickr from "react-flatpickr";
import { student } from "Common/data/students";
import { parent } from "Common/data/parents";

const ParentDetails = () => {
  const LocationTeam = useLocation();


  document.title = "Parent Details | School Administration";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Col xl={12}>
            <Card>
              <div className="d-flex align-items-center p-2">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-1">Profile Details</h5>
                </div>
              </div>
              <hr className="my-2 text-muted" />
              <Card.Body>
                <Row>
                  <Tab.Container defaultActiveKey="custom-v-pills-home">
                    <Col lg={2}>
                      <Nav
                        variant="pills"
                        className="flex-column nav-pills-tab custom-verti-nav-pills text-center"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <Nav.Link eventKey="custom-v-pills-home">
                          <i className="ri-user-2-line d-block fs-20 mb-1"></i>{" "}
                          Profile
                        </Nav.Link>

                        <Nav.Link eventKey="custom-v-pills-messages">
                          <i className="ri-group-line d-block fs-20 mb-1"></i>{" "}
                          Student Details
                        </Nav.Link>
                      </Nav>
                    </Col>
                    <Col lg={10}>
                      <Tab.Content className="text-muted mt-3 mt-lg-0">
                        <Tab.Pane eventKey="custom-v-pills-home">
                          <div>
                            <div style={{ position: "relative" }}>
                              <img
                                className="img-thumbnail rounded-circle avatar-xl"
                                alt="200x200"
                                src={LocationTeam.state.user_img}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            </div>
                            {/* <Row className="g-3"> */}
                            <Row>
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Card ID
                                </label>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter Last Name"
                                  defaultValue={LocationTeam.state.cardId}
                                />
                              </Col>
                              <Col sm={3}>
                                <label
                                  htmlFor="firstName"
                                  className="form-label"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  readOnly
                                  placeholder="Enter First Name"
                                  defaultValue={LocationTeam.state.first_name}
                                />
                              </Col>

                              <Col sm={2}>
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter Last Name"
                                  defaultValue={LocationTeam.state.last_name}
                                />
                              </Col>

                              <Col sm={2}>
                                <div>
                                  <label
                                    htmlFor="account-status"
                                    className="form-label"
                                  >
                                    Account Status
                                  </label>
                                  <select
                                    className="form-select"
                                    required
                                    id="account-status-field"
                                    defaultValue={LocationTeam.state.status}
                                  >
                                    <option defaultValue="">
                                      Account Status
                                    </option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">inactive</option>
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    House Number and Street
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      readOnly
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Address"
                                      defaultValue={
                                        LocationTeam.state.house_number
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Departement
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Departement"
                                      defaultValue={LocationTeam.state.location}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Post Code
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Zip Code"
                                      defaultValue={
                                        LocationTeam.state.post_code
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Country
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Country"
                                      defaultValue={LocationTeam.state.location}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-5">
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    readOnly
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    defaultValue={LocationTeam.state.email}
                                  />
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Mobile / Phone No
                                  </label>
                                  <input
                                    readOnly
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter phone number"
                                    defaultValue={LocationTeam.state.mobile}
                                  />
                                </div>
                              </Col>
                            </Row>
                            {/* </Row> */}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="custom-v-pills-messages">
                          {/* <div>
                            <h5>Students Details</h5>
                          </div> */}
                            
                          <div>
                            <div style={{ position: "relative" }}>
                              <img
                                className="img-thumbnail rounded-circle avatar-xl"
                                alt="200x200"
                                src={LocationTeam.state.user_img}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            </div>
                            {/* <Row className="g-3"> */}
                            <Row>
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Card ID
                                </label>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter Last Name"
                                  defaultValue={LocationTeam.state.cardId}
                                />
                              </Col>
                              <Col sm={3}>
                                <label
                                  htmlFor="firstName"
                                  className="form-label"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  readOnly
                                  placeholder="Enter First Name"
                                  defaultValue={LocationTeam.state.first_name}
                                />
                              </Col>

                              <Col sm={2}>
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter Last Name"
                                  defaultValue={LocationTeam.state.last_name}
                                />
                              </Col>

                              <Col sm={2}>
                                <div>
                                  <label
                                    htmlFor="account-status"
                                    className="form-label"
                                  >
                                    Account Status
                                  </label>
                                  <select
                                    className="form-select"
                                    required
                                    id="account-status-field"
                                    defaultValue={LocationTeam.state.status}
                                  >
                                    <option defaultValue="">
                                      Account Status
                                    </option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">inactive</option>
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    House Number and Street
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      readOnly
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Address"
                                      defaultValue={
                                        LocationTeam.state.house_number
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Departement
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Departement"
                                      defaultValue={LocationTeam.state.location}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Post Code
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Zip Code"
                                      defaultValue={
                                        LocationTeam.state.post_code
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    Country
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Country"
                                      defaultValue={LocationTeam.state.location}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    PickUp Station
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      readOnly
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Address"
                                      defaultValue={
                                        LocationTeam.state.house_number
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  <Form.Label htmlFor="countryInput">
                                    PickUp Time
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control"
                                    defaultValue={
                                      LocationTeam.state.dropdown_time
                                    }
                                    options={{
                                      enableTime: true,
                                      noCalendar: true,
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="col-12">
                                  <label
                                    htmlFor="username"
                                    className="form-label"
                                  >
                                    DropOff Station
                                  </label>
                                  <div className="input-group">
                                    <input
                                      readOnly
                                      type="text"
                                      className="form-control"
                                      id="username"
                                      placeholder="Enter Zip Code"
                                      defaultValue={
                                        LocationTeam.state.post_code
                                      }
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  <Form.Label htmlFor="countryInput">
                                    DropOff Time
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control"
                                    defaultValue={
                                      LocationTeam.state.dropdown_time
                                    }
                                    options={{
                                      enableTime: true,
                                      noCalendar: true,
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col sm={3} style={{ marginLeft: "150px" }}>
                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Stops
                                  </label>
                                  <input
                                    readOnly
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    defaultValue={LocationTeam.state.email}
                                  />
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    readOnly
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    defaultValue={LocationTeam.state.email}
                                  />
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="col-12">
                                  <label htmlFor="email" className="form-label">
                                    Mobile / Phone No
                                  </label>
                                  <input
                                    readOnly
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter phone number"
                                    defaultValue={LocationTeam.state.mobile}
                                  />
                                </div>
                              </Col>
                            </Row>
                            {/* </Row> */}
                          </div>
                           
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </Row>
              </Card.Body>
              {/* <Card.Footer className="d-flex justify-content-center">
                <button
                  type="button"
                  className="d-flex justify-content-center btn btn-info btn-label"
                >
                  <i className="ri-check-fill label-icon align-middle fs-16 me-2"></i>{" "}
                  Apply
                </button>
              </Card.Footer> */}
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ParentDetails;
