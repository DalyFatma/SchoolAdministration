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

const AddNewParent = () => {
  document.title = "Create Parent Account | School Administration";

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
                        <h5 className="card-title mb-1">Parents Groups</h5>
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
                            <Col lg={2}>
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
                              <Form.Label>Nationality</Form.Label>
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
                            <Col lg={4}>
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
                          <Col lg={12}>
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

export default AddNewParent;

// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import Breadcrumb from "Common/BreadCrumb";
// import { Link } from "react-router-dom";
// import Flatpickr from "react-flatpickr";
// import Dropzone from "react-dropzone";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const AddNewStudent = () => {
//   document.title = "Create Student | School Administration";
//   const [fullName, setFullName] = useState("");
//   const [selectedFiles, setselectedFiles] = useState([]);
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);

//   const handleAddItemClick = () => {
//     setShowAdditionalForm(!showAdditionalForm);
//   };

//   function handleAcceptedFiles(files: any) {
//     files.map((file: any) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//         formattedSize: formatBytes(file.size),
//       })
//     );
//     setselectedFiles(files);
//   }

//   /* Formats the size */
//   function formatBytes(bytes: any, decimals = 2) {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//   }

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
//           <form
//             id="createproduct-form"
//             autoComplete="off"
//             className="needs-validation"
//             noValidate
//           >
//             <Row>
//               <Col lg={12}>
//                 <Card>
//                   <Card.Header>
//                     <div className="d-flex">
//                       <div className="flex-shrink-0 me-3">
//                         <div className="avatar-sm">
//                           <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                             <i className="ph ph-student"></i>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex-grow-1">
//                         <h5 className="card-title mb-1">Student Information</h5>
//                       </div>
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <div className="mb-3">
//                       <Form className="tablelist-form">
//                         <input type="hidden" id="id-field" />
//                         <Row>
//                           <Row>
//                             {/* First Name  == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="customerName-field">
//                                   First Name
//                                 </Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   id="customerName-field"
//                                   placeholder="Enter first name"
//                                   required
//                                 />
//                               </div>
//                             </Col>
//                             {/* Last Name == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Last Name
//                                 </Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   id="supplierName-field"
//                                   placeholder="Enter last name"
//                                   required
//                                 />
//                               </div>
//                             </Col>

//                             {/* Birth_Date  == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Birth Date
//                                 </Form.Label>
//                                 <Flatpickr
//                                   className="form-control flatpickr-input"
//                                   placeholder="Select Date"
//                                   options={{
//                                     dateFormat: "d M, Y",
//                                   }}
//                                 />
//                               </div>
//                             </Col>
//                             {/* Address  == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Address
//                                 </Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   id="supplierName-field"
//                                   placeholder="Enter address"
//                                   required
//                                 />
//                               </div>
//                             </Col>
//                           </Row>
//                           <Row>
//                             {/* Email  == Done */}
//                             <Col lg={4}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Email
//                                 </Form.Label>
//                                 <Form.Control
//                                   type="email"
//                                   id="supplierName-field"
//                                   placeholder="Enter email"
//                                   required
//                                 />
//                               </div>
//                             </Col>
//                             {/* Phone  == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Phone
//                                 </Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   id="supplierName-field"
//                                   placeholder="Enter phone"
//                                   required
//                                 />
//                               </div>
//                             </Col>
//                             {/*  Nationaity == Not Yet */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Nationality
//                                 </Form.Label>
//                                 <select
//                                   className="form-select text-muted"
//                                   name="choices-single-default"
//                                   id="statusSelect"
//                                   required
//                                 >
//                                   <option value="">Capacity</option>
//                                   <option value="2">2</option>
//                                   <option value="3">3</option>
//                                   <option value="4">4</option>
//                                   <option value="5">5</option>
//                                   <option value="6">6</option>
//                                   <option value="7">7</option>
//                                   <option value="8">8</option>
//                                   <option value="9">9</option>
//                                   <option value="10">10</option>
//                                   <option value="11">11</option>
//                                   <option value="12">12</option>
//                                   <option value="13">13</option>
//                                 </select>
//                               </div>
//                             </Col>
//                             {/* Original_Nationality  == Not Yet */}
//                             <Col lg={2}>
//                               <div className="mb-3">
//                                 <Form.Label htmlFor="supplierName-field">
//                                   Original Nationality
//                                 </Form.Label>
//                                 <select
//                                   className="form-select text-muted"
//                                   name="choices-single-default"
//                                   id="statusSelect"
//                                   required
//                                 >
//                                   <option value="">Capacity</option>
//                                   <option value="2">20kg</option>
//                                   <option value="3">75kg</option>
//                                 </select>
//                               </div>
//                             </Col>
//                           </Row>

//                           <Row>
//                             {/* Gender  == Done */}
//                             <Col lg={3}>
//                               <div className="mb-3">
//                                 <label
//                                   htmlFor="statusSelect"
//                                   className="form-label"
//                                 >
//                                   Gender
//                                 </label>
//                                 <select
//                                   className="form-select text-muted"
//                                   name="choices-single-default"
//                                   id="statusSelect"
//                                   required
//                                 >
//                                   <option value="">Gender</option>
//                                   <option value="Male">Male</option>
//                                   <option value="Female">Female</option>
//                                   <option value="Other">Other</option>
//                                 </select>
//                               </div>
//                             </Col>
//                           </Row>
//                           <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-cards"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">Legal Card</h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <label
//                                       htmlFor="statusSelect"
//                                       className="form-label"
//                                     >
//                                       Number
//                                     </label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter number"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="orderDate-field">
//                                       Date
//                                     </Form.Label>
//                                     <Flatpickr
//                                       className="form-control flatpickr-input"
//                                       placeholder="Select Date"
//                                       options={{
//                                         dateFormat: "d M, Y",
//                                       }}
//                                     />
//                                   </div>
//                                 </Col>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <label
//                                       htmlFor="statusSelect"
//                                       className="form-label"
//                                     >
//                                       File
//                                     </label>
//                                     <Form.Control
//                                       type="file"
//                                       id="supplierName-field"
//                                       placeholder="Enter number"
//                                       className="text-muted"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Col>
//                           <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-users-three"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">
//                                     Parent/Guardian Information
//                                   </h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                                 {/* Full Name == Done */}
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Full Name
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter full name"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                                 {/*  Relationship == Done */}
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Relationship
//                                     </Form.Label>
//                                     <select
//                                       className="form-select text-muted"
//                                       name="choices-single-default"
//                                       id="statusSelect"
//                                       required
//                                     >
//                                       <option value="">Relationship</option>
//                                       <option value="Mother">Mother</option>
//                                       <option value="Father">Father</option>
//                                       <option value="Other">Other</option>
//                                     </select>
//                                   </div>
//                                 </Col>
//                               </Row>
//                               <Row>
//                                 {/* Address  == Done */}
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Address
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter address"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>

//                                 {/* Email  == Done */}
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Email
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="email"
//                                       id="supplierName-field"
//                                       placeholder="Enter email"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                                 {/* Phone  == Done */}
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Phone
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter phone"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                               </Row>

//                               <Row>
//                                 {showAdditionalForm && (
//                                   <>
//                                     <Row>
//                                       <Col lg={3}>
//                                         <div className="mb-3">
//                                           <Form.Label htmlFor="emergencyContactToggle">
//                                             Emergency Contact
//                                           </Form.Label>
//                                           <Form.Check
//                                             type="switch"
//                                             id="emergencyContactToggle"
//                                             label=""
//                                           />
//                                         </div>
//                                       </Col>
//                                     </Row>
//                                     <Row>

//                                     </Row>
//                                   </>
//                                 )}
//                                 <tr>
//                                   <td>
//                                     <Link
//                                       to="#"
//                                       id="add-item"
//                                       className="btn btn-soft-secondary fw-medium"
//                                       onClick={handleAddItemClick}
//                                     >
//                                       <i className="ri-add-fill me-1 align-bottom"></i>
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               </Row>
//                             </Card.Body>
//                           </Col>

//                           <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-bus"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">
//                                     Transportation Details
//                                   </h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                               <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Station
//                                     </Form.Label>
//                                     <select
//                                       className="form-select text-muted"
//                                       name="choices-single-default"
//                                       id="statusSelect"
//                                       required
//                                     >
//                                       <option value="">Sations</option>
//                                       <option value="Mother">Mother</option>
//                                       <option value="Father">Father</option>
//                                       <option value="Other">Other</option>
//                                     </select>
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Col>
//                           {/* <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-coins"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">
//                                     Transportation Fee Information
//                                   </h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Station
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter station"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Col> */}

//                           <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-camera"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">Profile Picture</h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <label
//                                       htmlFor="statusSelect"
//                                       className="form-label"
//                                     >
//                                       Add Profile Picture
//                                     </label>
//                                     <Form.Control
//                                       type="file"
//                                       id="supplierName-field"
//                                       placeholder="Enter number"
//                                       className="text-muted"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Col>
//                           {/* <Col lg={12}>
//                             <Card.Header>
//                               <div className="d-flex">
//                                 <div className="flex-shrink-0 me-3">
//                                   <div className="avatar-sm">
//                                     <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                                       <i className="ph ph-bus"></i>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex-grow-1">
//                                   <h5 className="card-title">
//                                     Transportation Policy Agreement
//                                   </h5>
//                                 </div>
//                               </div>
//                             </Card.Header>
//                             <Card.Body>
//                               <Row>
//                                 <Col lg={3}>
//                                   <div className="mb-3">
//                                     <Form.Label htmlFor="supplierName-field">
//                                       Station
//                                     </Form.Label>
//                                     <Form.Control
//                                       type="text"
//                                       id="supplierName-field"
//                                       placeholder="Enter station"
//                                       required
//                                     />
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Col> */}
//                           <Col lg={12}>
//                             <div className="hstack gap-2 justify-content-end">
//                               <Button variant="primary" id="add-btn">
//                                 Add Student
//                               </Button>
//                             </div>
//                           </Col>
//                         </Row>
//                       </Form>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </form>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default AddNewStudent;
