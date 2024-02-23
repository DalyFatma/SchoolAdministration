import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleBar from "simplebar-react";
// Import Contry Data
import country from "Common/country";

const EditStudent = () => {
  document.title = "Edit Account Student | School Administration";
  const navigate = useNavigate();
  const setactiveTab =()=>{
    navigate(-1)
  }
  const studentDetails = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
          >
            <Row className="d-flex justify-content-center">
             
              <Col lg={12}>
                <Card>
                  <Card.Body>
                    <Row className="g-3">
                      <Row style={{ marginTop: "30px" }}>
                        <Col lg={1}>
                          <img
                            className="rounded"
                            alt="200x200"
                            width="100"
                            src={studentDetails.state.user_img}
                            style={{
                              marginLeft: "20px",
                              marginBottom: "10px",
                              marginRight: "0",
                              marginTop: "10px",
                            }}
                          />
                        </Col>

                        <Col lg={2} style={{ marginLeft: "20px",marginTop:"20px"}}>
                          <div >
                            <Form.Label htmlFor="firstName">
                              First Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="firstName"
                              placeholder="Enter your first name"
                              defaultValue={studentDetails.state.first_name}
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div style={{ marginLeft: "0",marginTop:"20px"}}>
                            <Form.Label htmlFor="lastName">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="lastName"
                              placeholder="Enter your last name"
                              defaultValue={studentDetails.state.last_name}
                            />
                          </div>
                        </Col>
                        <Col lg={2}>
                        <div>
                          <Form.Label htmlFor="birdthdatInput" style={{marginTop:"20px"}}>
                            Date Of Birth
                          </Form.Label>
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                            }}
                            defaultValue={studentDetails.state.date_birth}
                          
                          />
                        </div>
                      </Col>
                        <Col lg={1}>
                          <div style={{ marginLeft: "0",marginTop:"20px"}}>
                            <Form.Label htmlFor="lastName">Status</Form.Label>
                            <Form.Control
                              type="text"
                              id="lastName"
                              placeholder="Enter your last name"
                              defaultValue={studentDetails.state.status}
                            />
                          </div>
                        </Col>
                      </Row >

                      
                    <Row className="mb-2">
                      <Col lg={3} style={{marginLeft:"20px"}}>
                        <div>
                          <Form.Label htmlFor="emailInput">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="emailInput"
                            placeholder="name@toner.com"
                            defaultValue={studentDetails.state.adressMail}
                          />
                        </div>
                      </Col>
                      <Col lg={4} >
                        <div>
                          <Form.Label htmlFor="phoneInput">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="phoneInput"
                            placeholder="Enter phone number"
                            defaultValue={studentDetails.state.mobile}
                          />
                        </div>
                      </Col>
                     
                      <Col lg={3}>
                        <div>
                          <Form.Label htmlFor="designationInput">
                            Card ID
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="designationInput"
                            placeholder="Designation"
                            defaultValue={studentDetails.state.cardId}
                          />
                        </div>
                      </Col>
                      </Row>
                      <Row className="mb-2">
                      <Col lg={3}  style={{marginLeft:"20px"}}>
                        <div>
                          <Form.Label htmlFor="designationInput">
                            Class
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="designationInput"
                            placeholder="Designation"
                            defaultValue="Chemistry"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="websiteInput1">
                            Trip Group
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="websiteInput1"
                            placeholder=""
                            defaultValue={studentDetails.state.group}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <Form.Label htmlFor="websiteInput1">
                            Joining Date
                          </Form.Label>
                          <Flatpickr
                            className="form-control flatpickr-input"
                            placeholder="Select Date"
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                            }}
                            defaultValue={studentDetails.state.date_birth}
                          />
                        </div>
                      </Col>
                      </Row>
                      <Row className="mb-2">
                      <Col lg={7} style={{marginLeft:"20px"}}>
                        <div>
                          <Form.Label htmlFor="cityInput">
                            PickUp Station
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="cityInput"
                            placeholder="City"
                            defaultValue={studentDetails.state.pickup_station}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <Form.Label htmlFor="countryInput">
                            PickUp Time
                          </Form.Label>
                          <Flatpickr
                            className="form-control"
                            defaultValue={studentDetails.state.pickup_time}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                            }}
                          />
                        </div>
                      </Col>
                      </Row>
                      <Row>
                      <Col lg={7} style={{marginLeft:"20px"}}>
                        <div>
                          <Form.Label htmlFor="zipcodeInput">
                            DropOff Station
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="zipcodeInput"
                            placeholder="Enter zipcode"
                            defaultValue={studentDetails.state.dropdown_station}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <Form.Label htmlFor="countryInput">
                            DropOff Time
                          </Form.Label>
                          <Flatpickr
                            className="form-control"
                            defaultValue={studentDetails.state.dropdown_time}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                            }}
                          />
                        </div>
                      </Col>
                      </Row>
                      <Col lg={12}>
                        <div className="text-end">
                          <Button variant="secondary" type="submit">
                            Update Profile
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center">
            
              <Col lg={12}  >
                <Card>
                  <Card.Body>
                    <Row className="g-3">
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="firstName">
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            defaultValue={studentDetails.state.first_name}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="lastName">Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            defaultValue={studentDetails.state.last_name}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="lastName">Status</Form.Label>
                          <Form.Control
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            defaultValue={studentDetails.state.status}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="emailInput">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="emailInput"
                            placeholder="name@toner.com"
                            defaultValue={studentDetails.state.adressMail}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="phoneInput">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="phoneInput"
                            placeholder="Enter phone number"
                            defaultValue={studentDetails.state.mobile}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="designationInput">
                            Card ID
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="designationInput"
                            placeholder="Designation"
                            defaultValue={studentDetails.state.cardId}
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="text-end">
                          <Button variant="primary" type="submit">
                            Change Parents Student
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
             
              <Col lg={12}>
                <Card>
                  <Card.Body>
                    <Row className="g-3">
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="facebook">Facebook</Form.Label>
                          <Form.Control
                            type="text"
                            id="facebook"
                            placeholder="Username"
                            defaultValue="Raquel"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="whatsappInput">
                            Whatsapp
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id="whatsappInput"
                            placeholder="+(235) 01234 5678"
                            defaultValue="+(253) 98765 4321"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="twitterInput">
                            Twitter <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="twitterInput"
                            placeholder="Username"
                            defaultValue="@raquel_morillo"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Form.Label htmlFor="emailInput2">Email</Form.Label>
                          <Form.Control
                            type="text"
                            id="emailInput2"
                            placeholder="example@toner.com"
                            defaultValue="raquelmurillo@toner.com"
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="text-end">
                          <Button variant="primary" type="submit">
                            Change Social Media
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

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
                          {/* <button
                            type="button"
                            className="btn btn-success  ms-auto"
                            
                          >
                       
                            Add Account
                          </button> */}
                        </div>
                          </Col>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditStudent;
