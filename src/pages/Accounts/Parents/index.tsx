import React, { useState, useMemo, useCallback } from "react";
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
import { parent } from "Common/data/parents";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";

const Parents = () => {
  
 document.title = "Parents | School Administartion";
  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);
  function tog_AddUserModals() {
    setmodal_AddUserModals(!modal_AddUserModals);
  }
  const navigate = useNavigate();

  function tog_AddShippingModals() {
    navigate("/parents/add-parent");
  }
  const columns = useMemo(
    () => [
      {
        Header: "Parent Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center gap-2 ">
              <div className="flex-shrink-0">
                <img
                  src={cellProps.user_img}
                  alt=""
                  className="avatar-xs rounded-circle user-profile-img "
                />
              </div>
              <div className="flex-grow-1 ms-2 user_name">
              {cellProps.first_name} {cellProps.last_name}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Card ID",
        accessor: "cardId",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Phone Contact",
        accessor: "mobile",
        disableFilters: true,
        filterable: true,
      },
      
      {
        Header: "Email Address",
        accessor: "email",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Number Student",
        accessor: "number_student",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Locality",
        accessor: "location",
        disableFilters: true,
        filterable: true,
      },
    
      {
        Header: "Account Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          switch (cellProps.status) {
            case "Active":
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {cellProps.status}
                </span>
              );
            case "Inactive":
              return (
                <span className="badge bg-danger-subtle text-danger">
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
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="/parents/parent-details"
                  className="badge bg-dark-subtle text-dark view-item-btn"
                  state={cellProps}
                >
                  <i className="ph ph-eye" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' ,fontSize: '1.5em',}}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge bg-primary-subtle text-primary edit-item-btn"
                >
                  <i className="ph ph-pencil-line" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' ,fontSize: '1.5em',}}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge bg-danger-subtle text-danger remove-item-btn"
                >
                  <i className="ph ph-trash" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' ,fontSize: '1.5em',}}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Accounts" pageTitle="Parents" />

          <Row id="usersList">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-3">
                    <Col xxl={3} lg={6}>
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for parent ..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col xxl={3} lg={6}>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Select Date"
                        options={{
                          mode: "range",
                          dateFormat: "d M, Y",
                        }}
                      />
                    </Col>
                    <Col xxl={2} lg={3}>
                      <select
                        className="form-select"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                      >
                        <option value="">Status</option>
                        <option defaultValue="all">All</option>
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="This Month">This Month</option>
                        <option value="Last Month">Last Month</option>
                      </select>
                    </Col>
                    
                    <Col xxl={2} lg={3}>
                      <select
                        className="form-select"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <Button
                        variant="success"
                        onClick={() => tog_AddShippingModals()}
                        className="add-btn"
                         style={{marginLeft:"40px"}}
                      >
                        <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                        Add Parent
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body className="p-0">
                  <TableContainer
                    columns={columns || []}
                    data={parent || []}
                    // isGlobalFilter={false}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClass="table-centered align-middle table-nowrap mb-0"
                    theadClass="text-muted"
                    SearchPlaceholder="Search Products..."
                  />
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                      No results Found.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Parents;


