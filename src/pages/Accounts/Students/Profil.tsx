import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";
import {
  Circle,
  User,
  Calendar,
  Phone,
  Clock,
  Clipboard,
  Airplane,
  Envelope,
  MapPin,
  HourglassMedium,
  GraduationCap,
  NumberCircleEight,
  NumberSquareOne,
  Check,
  Users,
  GenderFemale,
  GenderMale,
  GenderNonbinary,
  GlobeHemisphereWest,
} from "phosphor-react";

// Import Images
import img1 from "assets/images/users/avatar-1.jpg";
import { NumberSchema } from "yup";
import NoAttandance from "./NoAttandance";
import Activity from "./Activity";
import TableProfile from "./TableProfile";
import { Document, Page, pdfjs } from "react-pdf";

const Profile = (props: any) => {
  document.title = "Accounts | School Administration";

  const [showCardIdModal, setShowCardIdModal] = useState(false);
  const [cardIdImage, setCardIdImage] = useState("");

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const studentDetails = useLocation();
  console.log("studentdetails", studentDetails);

  if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

//pdf viewer

const [numPages, setNumPages] = useState<number | null>(null);
const [pageNumber, setPageNumber] = useState(1);
const [showPdf, setShowPdf] = useState(false);


const openModal = () => setShowPdf(true);
const closeModal = () => setShowPdf(false);

const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
};

const handleClick = () => {
    console.log("Button clicked");
    setShowPdf(true);
    console.log("showPdf:", showPdf);
};


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="My Account" pageTitle="Accounts" />  */}
          <Row>
            <Col xxl={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={3} >
                      <div className="profile-user-img position-relative">
                        {studentDetails.state &&
                          studentDetails.state.id_file && (
                            <img
                              src={`http://localhost:3000/studentFiles/img/${studentDetails.state.id_file}`}
                              alt=""
                              className="rounded object-fit-cover"
                              style={{
                                width: "100%",
                                height: "200px",
                                maxWidth: "500px",
                              }}
                            />
                          )}
                      </div>

                      
                        <Button
                          variant="soft-danger"
                          className="btn-label"
                          onClick={() => {
                            tog_AddShippingModals();
                          }}
                       style={{marginTop:"100px"}}
                        >
                          <i className="bi bi-file-image label-icon align-middle fs-16 me-2"></i>
                          Card ID Image
                        </Button>
        
                  
                    </Col>

                    <Col lg={9}>
                      <div className="d-flex border-bottom border-bottom-dashed pb-3 mb-3 mt-4 mt-lg-0">
                        <div className="flex-grow-1">
                          {studentDetails.state &&
                            studentDetails.state.firstName &&
                            studentDetails.state.lastName && (
                              <h5>
                                {studentDetails.state.firstName} {" "}
                                {studentDetails.state.lastName}
                              </h5>
                            )}

                          {studentDetails.state &&
                            studentDetails.state.classStudent && (
                              <p className="text-muted mb-0">
                                {studentDetails.state.classStudent}
                              </p>
                            )}
                        </div>
                      </div>

                      <Row>
                        <Col lg={6}>
                          <div className="table-responsive">
                            <Table className="table-borderless table-sm mb-0">
                              <tbody>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-user fw-medium"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Account Status</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.status_account && (
                                      <td
                                        style={{
                                          fontWeight: "medium",
                                          color:
                                            studentDetails.state
                                              .status_account === "Active"
                                              ? "green"
                                              : "red",
                                        }}
                                      >
                                        {studentDetails.state.status_account.toUpperCase()}
                                      </td>
                                    )}
                                </tr>

                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-identification-card"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Card ID</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.card_id && (
                                      <td className="">
                                        {studentDetails.state.card_id}
                                      </td>
                                    )}
                                </tr>

                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-envelope"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Email Address</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.email && (
                                      <td className="">
                                        {studentDetails.state.email}
                                      </td>
                                    )}
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-calendar"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Birth Date</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.dateBirth && (
                                      <td className="">
                                        {new Date(
                                          studentDetails.state.dateBirth
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </td>
                                    )}
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-phone"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Mobile / Phone No.</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.phone && (
                                      <td className="">
                                        {studentDetails.state.phone}
                                      </td>
                                    )}
                                </tr>
                                {/* <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-link"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Parent Relationship</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.mobile && (
                                      <td className="">
                                        {studentDetails.state.mobile}
                                      </td>
                                    )}
                                </tr> */}
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-student"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Class</td>
                                  </div>
                                  <td className="">Chemistry</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="table-responsive">
                            <Table className="table-borderless table-sm mb-0">
                              <tbody>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-checks"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Total Trips</td>
                                  </div>
                                  <td className="">237</td>
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-bus"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>PickUp Station</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.pickUp_station && (
                                      <td className="">
                                        {studentDetails.state.pickUp_station}
                                      </td>
                                    )}
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-timer"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>PickUp Time</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.pickUp_station && (
                                      <td className="">
                                        {/* {studentDetails.state.pickup_time} */}
                                        09:00
                                      </td>
                                    )}
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-bus"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                      
                                    ></i>
                                    <td>DropOff Station</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.DropOff_station && (
                                      <td className="">
                                        {studentDetails.state.DropOff_station}
                                      </td>
                                    )}
                                </tr>
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-timer"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>DropOff Time</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.DropOff_station && (
                                      <td className="">
                                        {/* {studentDetails.state.dropdown_time} */}
                                        09:30
                                      </td>
                                    )}
                                </tr>
                                {/* <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-bus"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Stop Station</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.mid_stations && (
                                      <td className="">
                                        {studentDetails.state.mid_stations}
                                      </td>
                                    )}
                                </tr> */}
                                <tr>
                                  <div className="d-flex align-item-start fw-medium">
                                    <i
                                      className="ph ph-users-four"
                                      style={{
                                        marginRight: "3px",
                                        marginTop: "4px",
                                      }}
                                    ></i>
                                    <td>Group Trip</td>
                                  </div>
                                  {studentDetails.state &&
                                    studentDetails.state.group && (
                                      <td className="">
                                        {studentDetails.state.group}
                                      </td>
                                    )}
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>

                      {/* <div className="mt-3">
                        <ul className="list-unstyled hstack gap-2 mb-0">
                          <li>Social Media:</li>
                          <li>
                            <Link
                              to="#!"
                              className="btn btn-soft-secondary btn-icon btn-sm"
                            >
                              <i className="ph-facebook-logo"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#!"
                              className="btn btn-soft-danger btn-icon btn-sm"
                            >
                              <i className="ph-envelope"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#!"
                              className="btn btn-soft-primary btn-icon btn-sm"
                            >
                              <i className="ph-twitter-logo"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#!"
                              className="btn btn-soft-success btn-icon btn-sm"
                            >
                              <i className="ph-whatsapp-logo"></i>
                            </Link>
                          </li>
                        </ul>
                      </div> */}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col xxl={3}>
              <Activity />
            </Col> */}

            <Col xxl={12}>
              <TableProfile />
            </Col>
          </Row>
        </Container>
      </div>

      <Modal className="fade zoomIn" size="lg" show={modal_AddShippingModals} onHide={() => { tog_AddShippingModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title fs-18" id="exampleModalLabel">Legal Card ID</h5>
                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                            <div>
                                <Document file={`https://bouden.uk.oxa.cloud/studentFiles/pdf/${studentDetails.state.photo_id}`} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={1} />
                                </Document>
                               
                            </div>
                        </Modal.Body>
                    </Modal>
    </React.Fragment>
  );
};

export default Profile;
