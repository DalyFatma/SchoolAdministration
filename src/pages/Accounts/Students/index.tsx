import React, { useState, useMemo, useEffect } from "react";
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
import Swal from "sweetalert2";

import {
  useFetchStudentsQuery,
  Student,
  useDeleteStudentMutation,
} from "features/student/studentSlice";
import { IdentificationBadge } from "phosphor-react";

const Students = (props: any) => {
  document.title = "Students | School Administartion";
  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // const dispatch= useAppDispatch();

  const { data = [] } = useFetchStudentsQuery();
  console.log("data",data)
  const [deleteStudent] = useDeleteStudentMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const AlertDelete = async (_id: string) => {
  
    swalWithBootstrapButtons
      .fire({
        title: "Are you Sure?",
        text: "You won't be able to go back!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteStudent(_id); // Pass studentId to deleteStudent mutation
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "The Student has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "The Student is safe :)",
            "error"
          );
        }
      });
  };

  const filteredStudents = Object.values(data).filter((student) => {
    const matchesSearchQuery =
      !searchQuery ||
      (student &&
        student.firstName &&
        student.lastName &&
        (student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.firstName.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesSelectedStatus =
      !selectedStatus || selectedStatus.toLowerCase() === "all";

    return matchesSearchQuery && matchesSelectedStatus;
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
        accessor: (students: Student) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`http://localhost:3000/studentFiles/img/${students.id_file}`}
                  alt="student-img"
                  id="id_file"
                  className="avatar-xs rounded-circle user-profile-img "
                 
                />
              </div>
              <div className="flex-grow-1 user_name">
                {students.firstName} {students.lastName}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Card ID",
        accessor: "card_id",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Phone Number",
        accessor: "phone",
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
        Header: "Email Address",
        accessor: "email",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "PickUp Station",
        accessor: "pickUp_station",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "PickUp Time/Date",
        accessor: (students: Student) => {
          const formattedPickUpTime = new Date(students.pickUp_time).toLocaleString();
          return formattedPickUpTime;
        },
        disableFilters: true,
        filterable: true,
      },
    
      {
        Header: "DropDown Station",
        accessor: "DropOff_station",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "DropOff Time/Date",
        accessor: (students: Student) => {
          const formattedDropOffTime = new Date(students.DropOff_time).toLocaleString();
          return formattedDropOffTime;
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Account Status",
        disableFilters: true,
        filterable: true,
        accessor: (students: Student) => {
          switch (students.status_account) {
            case "Active":
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {students.status_account}
                </span>
              );
            case "Inactive":
              return (
                <span className="badge bg-danger-subtle text-danger">
                  {" "}
                  {students.status_account}
                </span>
              );
            default:
              return (
                <span className="badge bg-success-subtle text-success">
                  {" "}
                  {students.status_account}
                </span>
              );
          }
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (students: Student) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="/student/view-profile"
                  className="badge bg-info-subtle text-info view-item-btn"
                  state={students}
                >
                  <i
                    className="ph ph-eye"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      fontSize: "1.5em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.4)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  ></i>
                </Link>
              </li>
              <li>
                <Link
                  to={`/students/edit-student/${students._id}`}
                  className="badge bg-primary-subtle text-primary edit-item-btn"
                  state={students}
                >
                  <i
                    className="ph ph-pencil-line"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      fontSize: "1.5em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  ></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge bg-danger-subtle text-danger remove-item-btn"
                >
                  <i
                    className="ph ph-trash"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      fontSize: "1.5em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={() => AlertDelete(students?._id!)}
                  ></i>
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
          <Breadcrumb title="Students" pageTitle="Accounts" />

          <Row id="usersList">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-3">
                    <Col lg={3}>
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
                    <Col lg={3}>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Select Date"
                        options={{
                          mode: "range",
                          dateFormat: "d M, Y",
                        }}
                      />
                    </Col>
                    <Col lg={2}>
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
                    <Col lg={2}>
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
                    <Col lg={2} className="d-flex justify-content-end">
                      <Button
                        variant="secondary"
                        onClick={() => tog_AddShippingModals()}
                        className="add-btn"
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
                    data={data || []}
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
                      <p className="text-muted mb-0">No results Found.</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Modal
            className="fade"
            show={modal_AddUserModals}
            onHide={() => {
              tog_AddUserModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Student Profile
              </h5>
            </Modal.Header>
            <Form className="tablelist-form">
              <Modal.Body className="p-4">
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />

                <div className="text-center">
                  <div className="position-relative d-inline-block">
                    <div className="position-absolute  bottom-0 end-0">
                      <label
                        htmlFor="customer-image-input"
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
                      />
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
                  <Form.Control
                    type="text"
                    id="user-name-field"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Form.Label htmlFor="email-field">Student Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email-field"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="account-status" className="form-label">
                    Account Status
                  </label>
                  <select
                    className="form-select"
                    required
                    id="account-status-field"
                  >
                    <option defaultValue="">Account Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">inactive</option>
                  </select>
                </div>
              </Modal.Body>
              <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddUserModals();
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="success" id="add-btn">
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Students;
