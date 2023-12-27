import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import { sellerGrid } from 'Common/data';
import { Link } from 'react-router-dom';

const SellersGridView = () => {

     document.title = "Trip Models | School Administration";

    

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Trip Models" pageTitle="Programming" />
                 
                </Container>
            </div>
        </React.Fragment>
    );
}

export default SellersGridView;