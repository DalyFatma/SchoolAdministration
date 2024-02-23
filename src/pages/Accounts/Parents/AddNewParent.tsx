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
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleBar from "simplebar-react";
// Import Contry Data
import country from "Common/country";
import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";

const AddNewParent = () => {
  document.title = "Create Parent Account | School Administration";

  const [selectedImage, setSelectedImage] = useState(dummyImg);

  const [seletedCountry1, setseletedCountry1] = useState<any>({});
  const [parents, setParents] = useState([{ id: 1 }]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const navigate = useNavigate();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        setSelectedImage(result || dummyImg);
      };

      reader.readAsDataURL(file);
    }
  };
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
  const setactiveTab = () => {
    navigate(-1);
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
                            <div
                              className="text-center"
                              style={{ marginBottom: "40px" }}
                            >
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <label
                                    htmlFor="users-image-input"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select Image"
                                  >
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </label>
                                  <Form.Control
                                    className="d-none"
                                    defaultValue=""
                                    id="users-image-input"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={handleImageChange}
                                  />
                                </div>
                                <div className="avatar-lg p-1">
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img
                                      src={selectedImage}
                                      alt="dummyImg"
                                      id="users-img-field"
                                      className="avatar-md rounded-circle object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* First Name  == Done */}
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="customerName-field">
                                  First Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="customerName-field"
                                  placeholder="Enter fFrst Name"
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
                                  placeholder="Enter Last Name"
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
                            <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Phone Number
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter phone"
                                  required
                                />
                              </div>
                            </Col>
                            {/*  Nationaity == Not Yet */}
                            {/* <Col lg={3}>
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
                            </Col> */}

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
                            <Col lg={4}>
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
                            <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Departement
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter Departement"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="supplierName-field">
                                  Country
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="supplierName-field"
                                  placeholder="Enter Country"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
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
                            {/* <Row>
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
                            </Row> */}
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
                                      Parent ID
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
                                      onChange={handleFileChange}
                                      required
                                    />
                                  </div>
                                  </Col>
                                  <Col lg={3}>
                                  {selectedFile && (
                                   
                                    <div className="image-container">
                                      <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected Preview"
                                        style={{ maxWidth: "20%", marginTop:"10px" }}
                                      />
                                    </div>
                                  
                                  )}
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
                                      <i className="ph ph-link"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Relationship to Student
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              {parents.map((parent) => (
                                <div key={parent.id}>
                                  <Row>
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="relationshipSelect"
                                          className="form-label"
                                        >
                                          Relationship to Student
                                        </label>
                                        <select
                                          className="form-select text-muted"
                                          name="relationshipSelect"
                                          id="relationshipSelect"
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
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="studentNameInput"
                                          className="form-label"
                                        >
                                          Student's Full Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="studentNameInput"
                                          name="studentNameInput"
                                          required
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="studentIdInput"
                                          className="form-label"
                                        >
                                          Student's ID or Roll Number
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="studentIdInput"
                                          name="studentIdInput"
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
                          {/* <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-credit-card"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Bank Account Informations
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="studentNameInput"
                                      className="form-label"
                                    >
                                      Bank Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="studentNameInput"
                                      name="studentNameInput"
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="studentIdInput"
                                      className="form-label"
                                    >
                                      Account Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="studentIdInput"
                                      name="studentIdInput"
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="studentIdInput"
                                      className="form-label"
                                    >
                                      Account Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="studentIdInput"
                                      name="studentIdInput"
                                      required
                                    />
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="studentIdInput"
                                      className="form-label"
                                    >
                                      Sort Code
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="studentIdInput"
                                      name="studentIdInput"
                                      required
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Col> */}
                          <Col lg={12}>
                            <div className="d-flex align-items-start gap-3 mt-4">
                              <button
                                type="button"
                                className="btn btn-link text-decoration-none btn-label previestab"
                                onClick={() => setactiveTab()}
                              >
                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                Back
                              </button>
                              <button
                                type="button"
                                className="btn btn-success  ms-auto"
                              >
                                {/* <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> */}
                                Add Account
                              </button>
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

export default AddNewParent;

