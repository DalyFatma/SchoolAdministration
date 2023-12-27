import React from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import img1 from "assets/images/brands/img-1.png";
import img2 from "assets/images/brands/img-2.png";
import img3 from "assets/images/brands/img-3.png";
import img4 from "assets/images/brands/img-4.png";
import img5 from "assets/images/brands/img-5.png";
import img6 from "assets/images/brands/img-6.png";
import img7 from "assets/images/brands/img-7.png";
import img8 from "assets/images/brands/img-8.png";
import img9 from "assets/images/brands/img-9.png";
import img10 from "assets/images/brands/img-10.png";
import img11 from "assets/images/brands/img-11.png";
import img12 from "assets/images/brands/img-12.png";
import img13 from "assets/images/brands/img-13.png";
import img14 from "assets/images/brands/img-14.png";
import { Link } from "react-router-dom";

const Delayschanges = () => {
    document.title = " Delays & Changes | School Administration";
  const columns = [
    
    // {
    //   name: <span className="font-weight-bold fs-13">SR No.</span>,
    //   selector: (row: any) => row.srNo,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">ID Trip</span>,
      selector: (row: any) => row.modalId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">ID Driver</span>,
      selector: (row: any) => row.purchaseId,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Title</span>,
    //   selector: (row: any) => <Link to="#!">{row.title}</Link>,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Vehicule</span>,
    //   selector: (row: any) => row.user,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Start Point</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Start Time</span>,
    //   selector: (row: any) => row.createdBy,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">End Point</span>,
      selector: (row: any) => row.createdBy,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">End Time</span>,
    //   selector: (row: any) => row.createdBy,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Create Date</span>,
    //   selector: (row: any) => row.createDate,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Status</span>,
    //   sortable: true,
    //   selector: (cell: any) => {
    //     switch (cell.status) {
    //       case "Re-open":
    //         return (
    //           <span className="badge badge-soft-info"> {cell.status} </span>
    //         );
    //       case "On-Hold":
    //         return (
    //           <span className="badge badge-soft-secondary">
    //             {" "}
    //             {cell.status}{" "}
    //           </span>
    //         );
    //       case "Closed":
    //         return (
    //           <span className="badge badge-soft-danger"> {cell.status} </span>
    //         );
    //       case "Inprogress":
    //         return (
    //           <span className="badge badge-soft-warning"> {cell.status} </span>
    //         );
    //       case "Open":
    //         return (
    //           <span className="badge badge-soft-primary"> {cell.status} </span>
    //         );
    //       case "New":
    //         return (
    //           <span className="badge badge-soft-success"> {cell.status} </span>
    //         );
    //       default:
    //         return (
    //           <span className="badge badge-soft-success"> {cell.status} </span>
    //         );
    //     }
    //   },
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Priority</span>,
    //   sortable: true,
    //   selector: (cell: any) => {
    //     switch (cell.priority) {
    //       case "High":
    //         return <span className="badge bg-danger"> {cell.priority} </span>;
    //       case "Medium":
    //         return <span className="badge bg-info"> {cell.priority} </span>;
    //       case "Low":
    //         return <span className="badge bg-success"> {cell.priority} </span>;
    //       default:
    //         return <span className="badge bg-danger"> {cell.priority} </span>;
    //     }
    //   },
    // },

    {
      name: <span className="font-weight-bold fs-13">Delays</span>,
      selector: (row: any) => row.delays,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Changes</span>,
      selector: (row: any) => row.changes,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,

      cell: (cellProps:any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
            <Link
                  to="#tripDetails"
                  data-bs-toggle="offcanvas"
                  className="badge bg-dark-subtle text-body view-item-btn"
                 
                >
                <i className="ph ph-eye"
                style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' ,fontSize: '1.5em',}}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}></i>
              </Link>
            </li>
            <li>
              <Link
                to="showModal"
                
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
  ];
  const data = [
    {
      srNo: "01",
      modalId: "VLZ-452",
      purchaseId: "VLZ1400087402",
      title: "Post launch reminder/ post list",
      user: "Dudley Street",
      assigned: "Adderley St",
      createdBy: "Dudley Street",
      createDate: "03 Oct, 2021",
      changes:"No Changing Route", 
      delays:"13 Minutes",
      status: "Re-open",
      priority: "High",
    },
    {
      srNo: "02",
      modalId: "VLZ-453",
      purchaseId: "VLZ1400087425",
      title: "Additional Calendar",
      user: "Diana Kohler",
      assigned: "Adderley St",
      changes:"Changing Route", 
      delays:"No delays",
      createdBy: "Colmore Row (Stop SH2)",
      createDate: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
    {
      srNo: "02",
      modalId: "VLZ-453",
      purchaseId: "VLZ1400087425",
      title: "Additional Calendar",
      // user: "Diana Kohler",
      assigned: "Colmore Row (Stop SH2)",
      changes:"Changing Route", 
      delays:"No delays",
      createdBy: "Adderley Str",
      createDate: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
   
    
    
  ];
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Delays&Changes" pageTitle="Tracking" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-3">
                  <Col xxl={3} lg={6}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Delayschanges;