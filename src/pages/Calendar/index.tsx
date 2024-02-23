import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Modal, Row, Col, Button } from "react-bootstrap";
import Breadcrumb from 'Common/BreadCrumb';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from '@fullcalendar/list';
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";

import * as Yup from "yup";
import { useFormik } from "formik";

import UpcommingEvents from './UpcommingEvents';

//redux
import { useSelector, useDispatch } from "react-redux";


import { Link } from 'react-router-dom';

const Calendar = () => {
   
    document.title = "Listing & Management | Bouden Coach Travel";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Listing & Management" pageTitle="Visitors Quote" />
                   <h1>Listing & Management</h1>
                </Container>
            </div>

            
        </React.Fragment >
    );
}

export default Calendar;