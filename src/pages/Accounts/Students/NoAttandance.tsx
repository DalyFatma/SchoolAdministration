
import React, { useState, useMemo } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import TableContainer from "Common/TableContainer";
// import { tripsmanagement } from "Common/data/tripsmanagment";
import { Link } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import { noattandance } from 'Common/data/noattandance';

const NoAttandance = () => {

    

    const [modal_AddShippingModals, setmodal_AddShippingModals] = useState<boolean>(false);
    function tog_AddShippingModals() {
        setmodal_AddShippingModals(!modal_AddShippingModals);
    }

    const columns = useMemo(
        () => [
            {
                Header: "Trip Ref",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (<Link to="#" className="fw-medium link-primary">{cellProps.trip_ref}</Link>)
                },
            },
            {
                Header: "Schedule ID ",
                accessor: "scheduale_id",
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
                Header: "Drop-Off Station",
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
                Header: "Middle Stations",
                accessor: "middle_station",
                disableFilters: true,
                filterable: true,
            },
           
            {
                Header: "Group Trip",
                accessor: "group",
                disableFilters: true,
                filterable: true,
            },
            
            {
                Header: "Attandancy",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    switch (cellProps.attandancy) {
                        case "Present":
                            return (<span className="badge bg-success-subtle text-success"> {cellProps.attandancy}</span>)
                        case "Abscent":
                            return (<span className="badge bg-danger-subtle text-danger"> {cellProps.attandancy}</span>)                      
                        default:
                            return (<span className="badge bg-success-subtle text-success"> {cellProps.attandancy}</span>)
                    }
                },
            },
            {
                Header: "Trip Type",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    switch (cellProps.type_trip) {
                        case "Extra Trip":
                            return (<span className="badge bg-secondary-subtle text-secondary"> {cellProps.type_trip}</span>)
                        case "Regular Trip":
                            return (<span className="badge bg-dark-subtle text-dark"> {cellProps.type_trip}</span>)
                            case "Offer Trip":
                                return (<span className="badge bg-info-subtle text-info"> {cellProps.type_trip}</span>)
                       
                        default:
                            return (<span className="badge bg-success-subtle text-success"> {cellProps.type_trip}</span>)
                    }
                },
            },
           
        ],
        []
    );

    return (
        <React.Fragment>
         
                    <Card id="shipmentsList">
                       
                        <Card.Body className='p-0'>
                            {/* <div className="table-responsive table-card"> */}
                                <TableContainer
                                    columns={(columns || [])}
                                    data={(noattandance || [])}
                                    //  isGlobalFilter={false}
                                    iscustomPageSize={false}
                                    isBordered={false}
                                    customPageSize={10}
                                    className="custom-header-css table align-middle table-nowrap"
                                    tableClass="table-centered align-middle table-nowrap mb-0"
                                    theadClass="text-muted"
                                    SearchPlaceholder='Search Products...'
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
                                    <p className="text-muted mb-0">We've searched more than 150+ shipment orders We did not find any shipment orders for you search.</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

            {/* </div> */}
        </React.Fragment>
    );
};

export default NoAttandance;