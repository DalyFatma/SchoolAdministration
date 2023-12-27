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
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleBar from "simplebar-react";
// Import Contry Data
import country from "Common/country";

const AddNewStudent = () => {
  document.title = "Create Account | School Administration";

  // const [selectedFiles, setselectedFiles] = useState([]);
  // const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  // Country Change States
  const [seletedCountry, setseletedCountry] = useState<any>({});
  const [seletedCountry1, setseletedCountry1] = useState<any>({});
  const [parents, setParents] = useState([{ id: 1 }]);

  const handleRemoveItemClick = (idToRemove: any) => {
    setParents((prevParents) =>
      prevParents.filter((parent) => parent.id !== idToRemove)
    );
  };

  const handleAddItemClick = () => {
    setParents((prevParents) => [
      ...prevParents,
      { id: prevParents.length + 1 },
    ]);
  };

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
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="ph ph-student"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Students Groups</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Header>
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-user"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title">Personal Information</h5>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body></Card.Body>
                    <div className="mb-3">
                      <Form className="tablelist-form">
                        <input type="hidden" id="id-field" />
                        <Row>
                          <Row>
                            {/* First Name  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="customerName-field">
                                  First Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="customerName-field"
                                  placeholder="Enter first name"
                                  required
                                />
                              </div>
                            </Col>
                            {/* Last Name == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Last Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter last name"
                                  required
                                />
                              </div>
                            </Col>
                            {/* Birth_Date  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Date of Birth
                                </Form.Label>
                                <Flatpickr
                                  className="form-control flatpickr-input"
                                  placeholder="Select Date"
                                  options={{
                                    dateFormat: "d M, Y",
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3">
                                <label
                                  htmlFor="statusSelect"
                                  className="form-label"
                                >
                                  Gender
                                </label>
                                <select
                                  className="form-select text-muted"
                                  name="choices-single-default"
                                  id="statusSelect"
                                  required
                                >
                                  <option value="">Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                          {/*  Nationaity == Not Yet */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label>Nationality</Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as="input"
                                  style={{
                                    backgroundImage: `url(${
                                      seletedCountry1.flagImg &&
                                      seletedCountry1.flagImg
                                    })`,
                                  }}
                                  className="form-control rounded-end flag-input form-select"
                                  placeholder="Select country"
                                  readOnly
                                  defaultValue={seletedCountry1.countryName}
                                ></Dropdown.Toggle>
                                <Dropdown.Menu
                                  as="ul"
                                  className="list-unstyled w-100 dropdown-menu-list mb-0"
                                >
                                  <SimpleBar
                                    style={{ maxHeight: "220px" }}
                                    className="px-3"
                                  >
                                    {(country || []).map(
                                      (item: any, key: number) => (
                                        <Dropdown.Item
                                          as="li"
                                          onClick={() =>
                                            setseletedCountry1(item)
                                          }
                                          key={key}
                                          className="dropdown-item d-flex"
                                        >
                                          <div className="flex-shrink-0 me-2">
                                            <Image
                                              src={item.flagImg}
                                              alt="country flag"
                                              className="options-flagimg"
                                              height="20"
                                            />
                                          </div>
                                          <div className="flex-grow-1">
                                            <div className="d-flex">
                                              <div className="country-name me-1">
                                                {item.countryName}
                                              </div>
                                              <span className="countrylist-codeno text-muted">
                                                {item.countryCode}
                                              </span>
                                            </div>
                                          </div>
                                        </Dropdown.Item>
                                      )
                                    )}
                                  </SimpleBar>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                          {/* Original_Nationality  == Not Yet */}
                          {/*  Nationaity == Not Yet */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label>Original Nationality</Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as="input"
                                  style={{
                                    backgroundImage: `url(${
                                      seletedCountry.flagImg &&
                                      seletedCountry.flagImg
                                    })`,
                                  }}
                                  className="form-control rounded-end flag-input form-select"
                                  placeholder="Select country"
                                  readOnly
                                  defaultValue={seletedCountry.countryName}
                                ></Dropdown.Toggle>
                                <Dropdown.Menu
                                  as="ul"
                                  className="list-unstyled w-100 dropdown-menu-list mb-0"
                                >
                                  <SimpleBar
                                    style={{ maxHeight: "220px" }}
                                    className="px-3"
                                  >
                                    {(country || []).map(
                                      (item: any, key: number) => (
                                        <Dropdown.Item
                                          as="li"
                                          onClick={() =>
                                            setseletedCountry(item)
                                          }
                                          key={key}
                                          className="dropdown-item d-flex"
                                        >
                                          <div className="flex-shrink-0 me-2">
                                            <Image
                                              src={item.flagImg}
                                              alt="country flag"
                                              className="options-flagimg"
                                              height="20"
                                            />
                                          </div>
                                          <div className="flex-grow-1">
                                            <div className="d-flex">
                                              <div className="country-name me-1">
                                                {item.countryName}
                                              </div>
                                              <span className="countrylist-codeno text-muted">
                                                {item.countryCode}
                                              </span>
                                            </div>
                                          </div>
                                        </Dropdown.Item>
                                      )
                                    )}
                                  </SimpleBar>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                          </Row>
                          <Row>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Phone Number 1
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter phone"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Phone Number 2
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter phone"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Email
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  id="supplierName-field"
                                  placeholder="Enter email"
                                  required
                                />
                              </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  House Number and Street
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter House Number and Street"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Locality
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter Locality"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Post Code
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter Post Code"
                                  required
                                />
                              </div>
                            </Col>
                            </Row>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusSelect"
                                    className="form-label"
                                  >
                                    Profile Picture
                                  </label>
                                  <Form.Control
                                    type="file"
                                    id="supplierName-field"
                                    placeholder="Enter number"
                                    className="text-muted"
                                    required
                                  />
                                </div>
                              </Col>
                            </Row>
                         

                          <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-identification-card"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Identification and Authentication
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Student ID
                                    </label>
                                    <Form.Control
                                      type="text"
                                      id="supplierName-field"
                                      placeholder="Enter number"
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="orderDate-field">
                                      Social Security Number
                                    </Form.Label>
                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      placeholder="Select Date"
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Photo
                                    </label>
                                    <Form.Control
                                      type="file"
                                      id="supplierName-field"
                                      placeholder="Enter number"
                                      className="text-muted"
                                      required
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Col>

                          <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-bus"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Transportation-Specific Information
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Station
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      required
                                    >
                                      <option value="">Station 1</option>
                                      <option value="Male">Station 2</option>
                                      <option value="Female">Station 3</option>
                                      <option value="Other">Station 4</option>
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={2}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Group
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      required
                                    >
                                      <option value="">Group</option>
                                      <option value="Active">Group 1</option>
                                      <option value="Inactive">Group 2</option>
                                    </select>
                                  </div>
                                </Col>
                                <Col lg={2}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Category
                                    </label>
                                    <select
                                      className="form-select text-muted"
                                      name="choices-single-default"
                                      id="statusSelect"
                                      required
                                    >
                                      <option value="">Category</option>
                                      <option value="Only Car">Only Car</option>
                                      <option value="Only Bus">Only Bus</option>
                                      <option value="Both">Both</option>
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Col>

                          <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-users-three"></i>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Parent/Guardian Information
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>

                            <Card.Body>
                              {parents.map((parent) => (
                                <div key={parent.id}>
                                  <Row>
                                    {/* Full Name == Done */}
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Full Name
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="supplierName-field"
                                          placeholder="Enter full name"
                                          required
                                        />
                                      </div>
                                    </Col>
                                    {/*  Relationship == Done */}
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Relationship
                                        </Form.Label>
                                        <select
                                          className="form-select text-muted"
                                          name="choices-single-default"
                                          id="statusSelect"
                                          required
                                        >
                                          <option value="">Relationship</option>
                                          <option value="Mother">Mother</option>
                                          <option value="Father">Father</option>
                                          <option value="Guardian">
                                            Guardian
                                          </option>
                                          <option value="Other">Other</option>
                                        </select>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* Address  == Done */}
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Address
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="supplierName-field"
                                          placeholder="Enter address"
                                          required
                                        />
                                      </div>
                                    </Col>

                                    {/* Email  == Done */}
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Email
                                        </Form.Label>
                                        <Form.Control
                                          type="email"
                                          id="supplierName-field"
                                          placeholder="Enter email"
                                          required
                                        />
                                      </div>
                                    </Col>
                                    {/* Phone  == Done */}
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Phone
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="supplierName-field"
                                          placeholder="Enter phone"
                                          required
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={3}>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-icon"
                                        onClick={() =>
                                          handleRemoveItemClick(parent.id)
                                        }
                                        style={{ marginTop: "27px" }}
                                      >
                                        <i className="ri-delete-bin-5-line"></i>
                                      </button>
                                      </Col>
                                    <Row>
                                      <Col lg={3}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="emergencyContactToggle">
                                            Emergency Contact
                                          </Form.Label>
                                          <Form.Check
                                            type="switch"
                                            id="emergencyContactToggle"
                                            label=""
                                          />
                                        </div>
                                      </Col>

                                      
                                    </Row>
                                  </Row>
                                </div>
                              ))}
                              <Row>
                                <tr>
                                  <td>
                                    <Link
                                      to="#"
                                      id="add-item"
                                      className="btn btn-soft-secondary fw-medium"
                                      onClick={handleAddItemClick}
                                    >
                                      <i className="ri-add-fill me-1 align-bottom"></i>
                                    </Link>
                                  </td>
                                </tr>
                              </Row>
                            </Card.Body>
                          </Col>

                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <Button variant="primary" id="add-btn">
                                Add Account
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewStudent;
