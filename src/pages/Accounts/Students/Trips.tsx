import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
// import { tripsmanagement } from "Common/data/tripsmanagment";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { complainstudent } from "Common/data/tripsinglestudent";

const Trips = () => {
  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Subject",
        accessor: "subject",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Submission Time",
        accessor: "submission_time",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Response Time",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
         
          if (cellProps.status === "Pending") {
            return "_";
          } else {
            
            return cellProps.response_time;
          }
        },
      },

      {
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          switch (cellProps.status) {
            case "Answered":
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {cellProps.status}
                </span>
              );

            case "Pending":
              return (
                <span className="badge bg-warning-subtle text-warning">
                  {" "}
                  {cellProps.status}
                </span>
              );

            default:
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {cellProps.status}
                </span>
              );
          }
        },
      },
      {
        Header: "Priority",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
            switch (cellProps.priority) {
                case "High":
                  return <span className="badge bg-danger"> {cellProps.priority} </span>;
                case "Medium":
                  return <span className="badge bg-info"> {cellProps.priority} </span>;
                case "Low":
                  return <span className="badge bg-success"> {cellProps.priority} </span>;
                default:
                  return <span className="badge bg-danger"> {cellProps.priority} </span>;
              }
        },
      },
      {
        Header: "Assigned To",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          switch (cellProps.assignedTo) {
            case "Bouden Coach Travel":
              return (
                <span className="badge bg-dark-subtle text-dark">
                  {" "}
                  {cellProps.assignedTo}
                </span>
              );

            case "School Administartion":
              return (
                <span className="badge bg-info-subtle text-info">
                  {" "}
                  {cellProps.assignedTo}
                </span>
              );

            default:
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {cellProps.status}
                </span>
              );
          }
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
    
          if (cellProps.assignedTo === "Bouden Coach Travel") {
        
            return (
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link
                    to="#"
                    className="badge bg-secondary-subtle text-secondary view-item-btn"
                  >
                    <i className="ph ph-eye" style={{ fontSize: "15px" }}></i>
                  </Link>
                </li>
              </ul>
            );
          } else {
           
            return (
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link
                    to="#"
                    className="badge bg-secondary-subtle text-secondary view-item-btn"
                  >
                    <i className="ph ph-eye" style={{ fontSize: "15px" }}></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="badge bg-info-subtle text-info view-item-btn"
                  >
                    <i
                      onClick={() => tog_AddShippingModals()}
                      className="ph ph-telegram-logo"
                      style={{ fontSize: "15px" }}
                    ></i>
                  </Link>
                </li>
              </ul>
            );
          }
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
  
      <Card id="shipmentsList">
        
        {/* </Card.Header> */}
        <Card.Body className="p-0">
          {/* <div className="table-responsive table-card"> */}
          <TableContainer
            columns={columns || []}
            data={complainstudent || []}
            // isGlobalFilter={false}
            iscustomPageSize={false}
            isBordered={false}
            customPageSize={10}
            className="custom-header-css table align-middle table-nowrap"
            tableClass="table-centered align-middle table-nowrap mb-0 text-center"
            theadClass="text-muted text-center"
            SearchPlaceholder="Search complains..."
          />
          {/* </div> */}
          <div className="noresult" style={{ display: "none" }}>
            <div className="text-center py-4">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                  <i className="bi bi-search"></i>
                </div>
              </div>
              <h5 className="mt-2">Sorry! No Result Found</h5>
              <p className="text-muted mb-0">
                We've searched more than 150+ shipment orders We did not find
                any shipment orders for you search.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
            className="fade zoomIn"
            size="lg"
            show={modal_AddShippingModals}
            onHide={() => {
              tog_AddShippingModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Send Message
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <Form className="tablelist-form">
                <input type="hidden" id="id-field" />
                <Row>
                  <div
                    id="alert-error-msg"
                    className="d-none alert alert-danger py-2"
                  ></div>
                  <Form className="tablelist-form">
                    <input type="hidden" id="id-field" />
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Title
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            placeholder="Enter note title"
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="supplierName-field">
                            Body
                          </Form.Label>

                          <div>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea5"
                              rows={3}
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <Button variant="primary" id="add-btn">
                            send
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
      {/* </Container> */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default Trips;
