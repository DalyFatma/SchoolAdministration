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
import { userList } from "Common/data";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";

const Attendances = () => {
  document.title = "Attendances | School Administation";
  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);
  function tog_AddUserModals() {
    setmodal_AddUserModals(!modal_AddUserModals);
  }
  const [showCoupons, setShowCoupons] = useState<boolean>(false);
  const [showCouponDetails, setShowCouponsDetails] = useState<any>({});

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkAll") as HTMLInputElement;
    const ele = document.querySelectorAll(".userCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    checkedbox();
  }, []);

  const checkedbox = () => {
    const ele = document.querySelectorAll(".userCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <img
                  src={cellProps.user_img}
                  alt=""
                  className="avatar-xs rounded-circle user-profile-img"
                />
              </div>
              <div className="flex-grow-1 ms-2 user_name">
                {cellProps.user_name}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Trip Reference",
        accessor: "tripref",
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
        Header: "Time/Date",
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
        Header: "Time/Date",
        accessor: "dropdown_time",
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
        },
      },
    ],
    [checkedAll]
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Students" pageTitle="Attendances" />

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
                    <Col xxl={3} lg={4}>
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
                    <Col xxl={3} lg={4}>
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
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body className="p-0">
                  <TableContainer
                    columns={columns || []}
                    data={userList || []}
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
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Attendances;
