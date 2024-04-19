import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Image,
  Modal,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { GoogleApiWrapper } from "google-maps-react";
import { Map } from "google-maps-react";
import { Marker } from "google-maps-react";
import avatar2 from "assets/images/users/avatar-2.jpg";
import avatar3 from "assets/images/users/avatar-3.jpg";
import avatar4 from "assets/images/users/avatar-4.jpg";
import avatar5 from "assets/images/users/avatar-5.jpg";
import { InfoWindow } from "google-maps-react";
import GroupAvatar from "./GroupAvatar";

import { ArrowFatLinesLeft } from "phosphor-react";
import Selection from "./Selection";
import { Polyline } from "google-maps-react";

const LoadingContainer = () => <div>Loading...</div>;

interface Location {
  lat: number;
  lng: number;
  name: string;
}
interface AddNewGroupProps {
  google: object;
}

const AddNewGroup: React.FC<AddNewGroupProps> = (props) => {
  document.title = "Groups | School Administration";

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  const [infoWindow, setInfoWindow] = useState<boolean>(true);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);

  const [totalStudents, setTotalStudents] = useState<number>(12);
  const [currentStudents, setCurrentStudents] = useState<number>(8);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [secondLocation, setSecondLocation] = useState<Location | null>(null);
  
  const [routeCoordinates, setRouteCoordinates] = useState<
    google.maps.LatLng[]
  >([]);

  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  useEffect(() => {
    if (selectedLocation && secondLocation) {
      calculateAndDisplayRoute();
    }
  }, [selectedLocation, secondLocation]);

  const calculateAndDisplayRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: new window.google.maps.LatLng(
        selectedLocation!.lat,
        selectedLocation!.lng
      ),
      destination: new window.google.maps.LatLng(
        secondLocation!.lat,
        secondLocation!.lng
      ),
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const route = result.routes[0].overview_path;
        setRouteCoordinates(
          route.map((point: any) => ({ lat: point.lat(), lng: point.lng() }))
        );
      }
    });
  };

  const handleLocationButtonClick = () => {
    // Set the first location marker
    setSelectedLocation({
      lat: 52.5244734,
      lng: -1.9857876,
      name: "Birmingham",
    });

    // Set the second location marker
    setSecondLocation({
      lat: 52.5344734,
      lng: -1.9957876,
      name: "Second Location",
    });
  };

  const handleMarkerClick = () => {
    setInfoWindowFlag(!showInfoWindow);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body style={{ height: "90vh" }}>
                  <div>
                    <Row>
                      <Col xxl={6} md={10} className="mx-auto">
                        <form action="#" className="mb-2">
                          <div className="seller-search-box position-relative">
                            <i className="ri-search-2-line position-absolute my-auto d-flex align-items-center"></i>
                            <input
                              type="text"
                              className="form-control rounded-pill border-0 shadow"
                              id="searchInputList"
                              autoComplete="off"
                              placeholder="Search for Trips ..."
                            />
                            <Button
                              variant="soft-danger"
                              className="fw-normal position-absolute rounded-pill"
                              onClick={() => handleLocationButtonClick()}
                            >
                              <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                              Birmingham
                            </Button>
                          </div>
                        </form>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xxl={12} style={{ marginRight: "20px" }}>
                        <div
                          id="gmaps-markers"
                          className="gmaps"
                          style={{ height: "500px", width: "20%" }}
                        >
                          <Map
                            google={props.google}
                            zoom={13}
                            style={{
                              height: "140%",
                              width: `98%`,
                            }}
                            initialCenter={{
                              lat: 52.5244734,
                              lng: -1.9857876,
                            }}
                            className="text-center"
                          >
                            {selectedLocation && (
                              <Marker
                                title={selectedLocation.name}
                                position={{
                                  lat: selectedLocation.lat,
                                  lng: selectedLocation.lng,
                                }}
                                onClick={() => tog_AddShippingModals()}
                              />
                            )}
                            {secondLocation && (
                              <Marker
                                title={secondLocation.name}
                                position={{
                                  lat: secondLocation.lat,
                                  lng: secondLocation.lng,
                                }}
                                onClick={() => tog_AddShippingModals()}
                              />
                            )}
                            {infoWindow && (
                              <InfoWindow
                                position={{
                                  lat: 52.5295185,
                                  lng: -1.988,
                                }}
                                visible={showInfoWindow}
                              >
                                <div>
                                
                                  <p>
                                    Students at this position: {currentStudents}
                                    /{totalStudents}
                                  </p>
                                  <GroupAvatar />
                                </div>
                              </InfoWindow>
                            )}
                            {routeCoordinates.length > 0 && (
                              <Polyline
                                path={routeCoordinates}
                                options={{
                                  strokeColor: "#FF0000",
                                  strokeOpacity: 1,
                                  strokeWeight: 2,
                                }}
                              />
                            )}
                          </Map>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>

              <Modal
                className="fade zoomIn"
                size="xl"
                show={modal_AddShippingModals}
                onHide={() => {
                  tog_AddShippingModals();
                }}
                centered
              >
                <Modal.Header className="px-4 pt-4" closeButton>
                  <h5 className="modal-title fs-18" id="exampleModalLabel">
                    Assign Student-Group
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
      
                      <Col lg={12} className="mt-2">
                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            className="btn-ghost-danger"
                            onClick={() => {
                              tog_AddShippingModals();
                            }}
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-line align-bottom me-1"></i>{" "}
                            Close
                          </Button>
                          <Button variant="primary" id="add-btn">
                            Add Student
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
  LoadingContainer: LoadingContainer,
  v: "3",
})(AddNewGroup);
