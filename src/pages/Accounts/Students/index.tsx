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
import { student } from "Common/data/students";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";

const Student = (props:any) => {
  document.title = "Students | School Administartion";
  const [modal_AddUserModals, setmodal_AddUserModals] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = student.filter((product) => {
    const matchesSearchQuery =
      !searchQuery ||
      (product &&
        product.status &&
        product.mid_stations &&
        product.dropdown_station &&
        product.dropdown_time &&
        product.pickup_station &&
        product.pickup_time &&
        product.group &&
        product.mobile &&
        product.first_name &&
        product.last_name &&
        (product.status
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          product.mid_stations.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.pickup_time.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.dropdown_time.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.pickup_station
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.dropdown_station
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.group
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.mobile
            .toLowerCase()
            .includes(searchQuery.toLowerCase())  ||
            product.last_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())  ||
            product.first_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) 
            
            ));

            const matchesSelectedStatus =
            !selectedStatus ||
            (selectedStatus.toLowerCase() === "all") || 
            (product &&
              product.status &&
              product.status.toLowerCase() === selectedStatus.toLowerCase());
          
   
    if (!searchQuery && !selectedStatus) {
      return true;
    }

    return (
      matchesSearchQuery && matchesSelectedStatus 
    );

   
  });


  function tog_AddUserModals() {
      setmodal_AddUserModals(!modal_AddUserModals);
  }

  const navigate = useNavigate();

  function tog_AddShippingModals() {
    navigate("/students/add-student");
  }
  
  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
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
      // {
      //   Header: "Adress Mail",
      //   accessor: "adressMail",
      //   disableFilters: true,
      //   filterable: true,
      // },
      {
        Header: "Mobile/Phone Number",
        accessor: "mobile",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Group",
        accessor: "group",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "PickUp Station",
        accessor: "pickup_station",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "PickUp Time",
        accessor: "pickup_time",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "DropDown Station",
        accessor: "dropdown_station",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "DropDown Time",
        accessor: "dropdown_time",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Mid Stations",
        accessor: "mid_stations",
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
                  to="/student/view-profile"
                  className="badge bg-info-subtle text-info view-item-btn"
                  state={cellProps}
                >
                  <i className="ph ph-eye" style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' ,fontSize: '1.5em',}}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/students/edit-student"
                  className="badge bg-primary-subtle text-primary edit-item-btn"
                  state={cellProps}
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
          <Breadcrumb title="Students" pageTitle=" Accounts" />

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
                          placeholder="Search for student ..."
                          onChange={(e) => setSearchQuery(e.target.value)}
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
                        <option value="">This Month</option>
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
                        onChange={(e) => setSelectedStatus(e.target.value)}
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
                        className="add-btn ml-100"
                        style={{marginLeft:"40px"}}
                      >
                        <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                        Add Student
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body className="p-0">
                  <TableContainer
                    columns={columns || []}
                    data={filteredTrips || []}
                    // isGlobalFilter={false}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClass="table-centered align-middle table-nowrap mb-0 text-center"
                    theadClass="text-muted text-center"
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
          <Modal className="fade" show={modal_AddUserModals} onHide={() => { tog_AddUserModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Student Profile</h5>
                        </Modal.Header>
                        <Form className="tablelist-form">
                            <Modal.Body className="p-4">
                                <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                <input type="hidden" id="id-field" />

                                <div className="text-center">
                                    <div className="position-relative d-inline-block">
                                        <div className="position-absolute  bottom-0 end-0">
                                            <label htmlFor="customer-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                                                <div className="avatar-xs cursor-pointer">
                                                    <div className="avatar-title bg-light border rounded-circle text-muted">
                                                        <i className="ri-image-fill"></i>
                                                    </div>
                                                </div>
                                            </label>
                                            <Form.Control className="d-none" defaultValue="" id="users-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                        </div>
                                        <div className="avatar-lg p-1">
                                            {/* <div className="avatar-title bg-light rounded-circle">
                                                <img src={user_img} alt="dummyImg" id="users-img-field" className="avatar-md rounded-circle object-cover" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <Form.Label htmlFor="user-name">Student Name</Form.Label>
                                    <Form.Control type="text" id="user-name-field" placeholder="Enter Name" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="email-field">Student Email</Form.Label>
                                    <Form.Control type="email" id="email-field" placeholder="Enter Email" required />
                                </div>

                                <div>
                                    <label htmlFor="account-status" className="form-label">Account Status</label>
                                    <select className="form-select" required id="account-status-field">
                                        <option defaultValue="">Account Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">inactive</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <Button className="btn-ghost-danger" onClick={() => { tog_AddUserModals(); }}>Close</Button>
                                    <Button variant='success' id="add-btn">Update</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Student;

