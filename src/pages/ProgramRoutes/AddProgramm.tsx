import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  Accordion,
  Row,
  Col,
  Form,
  Tab,
  Nav,
  Button,
  InputGroup,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { GoogleApiWrapper, Map } from "google-maps-react";
import { Link, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
  LoadScript,
} from "@react-google-maps/api";

const options = [
  { value: "ForHandicap", label: "For Handicap" },
  { value: "Wifi", label: "Wifi" },
  { value: "WC", label: "WC" },
  { value: "AC", label: "AC" },
];
const center = { lat: 52.4862, lng: -1.8904 };
const AddProgramm = (props: any) => {
  document.title = "Program | School Administration";
  const [showAddStations, setShowAddStations] = useState<boolean>(false);
  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [selected, setSelected] = useState(["Wifi", "AC"]);
  const [stops, setStops] = useState([{ id: 1 }]);
  const [searchResult, setSearchResult] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [fatma, setFatma] = useState<any>();
  const [nom, setNom] = useState<any>();
  const cloneLocation = useLocation();
  console.log(cloneLocation?.state);
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  if (!isLoaded) {
    return <p>Loading!!!!!</p>;
  }

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  function onLoadDest(autocomplete: any) {
    setSearchDestination(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.geometry?.location;
      setNom(place.geometry?.location);
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.geometry?.location;
      setFatma(place.geometry?.location);
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  const handleLocationButtonClick = () => {
    setSelectedLocation(nom);
  };

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(fatma);
  };
  async function calculateRoute(): Promise<void> {
    if (
      originRef?.current!.value === "" ||
      destinationRef?.current!.value === "" ||
      !map
    ) {
      console.error("Invalid inputs or map not loaded.");
      return;
    }

    setLoading(true);

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        setLoading(false);

        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);

          const selectedRoute = result.routes.find(
            (route) =>
              route.legs[0].start_address === originRef.current.value &&
              route.legs[0].end_address === destinationRef.current.value
          );

          if (!selectedRoute) {
            console.error("Route not found");
            return;
          }

          setDistance(selectedRoute.legs[0].distance.text);
          setDuration(selectedRoute.legs[0].duration.text);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }
  function clearRoute() {
    setDirectionsResponse(null);
    setLoading(false);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Program" pageTitle="Management" />
          <Card className="overflow-hidden">
            <Card.Header className="border-0">
              <div className="hstack gap-2 justify-content-end">
                <Button variant="success" id="add-btn" className="btn-sm">
                  Save & Send
                </Button>
                <Button variant="info" id="add-btn" className="btn-sm">
                  Quick Save
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="form-steps">
              <Card>
                <Card.Body className="form-steps" style={{ height: "70vh" }}>
                  <Form className="vertical-navs-step">
                    <Tab.Container activeKey={activeVerticalTab}>
                      <Row className="gy-5">
                        <Col lg={2}>
                          <Nav
                            as="div"
                            variant="pills"
                            className="nav flex-column custom-nav nav-pills"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <Nav.Link
                              as="button"
                              className="nav-link done"
                              eventKey="1"
                              onClick={() => setactiveVerticalTab(1)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Journey
                            </Nav.Link>
                            <Nav.Link
                              as="button"
                              className={
                                activeVerticalTab > 2
                                  ? "nav-link done"
                                  : "nav-link"
                              }
                              eventKey="2"
                              onClick={() => setactiveVerticalTab(2)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Stops
                            </Nav.Link>
                            <Nav.Link
                              as="button"
                              className={
                                activeVerticalTab > 3
                                  ? "nav-link done"
                                  : "nav-link"
                              }
                              eventKey="3"
                              onClick={() => setactiveVerticalTab(3)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Run Dates
                            </Nav.Link>
                            <Nav.Link
                              as="button"
                              className={
                                activeVerticalTab > 4
                                  ? "nav-link done"
                                  : "nav-link"
                              }
                              eventKey="4"
                              onClick={() => setactiveVerticalTab(4)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Passengers
                            </Nav.Link>
                          </Nav>
                        </Col>
                        <Col lg={10}>
                          <div className="px-lg-4">
                            <Tab.Content>
                              <Tab.Pane eventKey="1">
                                <div>
                                  <Row>
                                    <Col lg={4}>
                                      <Form.Label htmlFor="customerName-field">
                                        Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="customerName-field"
                                        required
                                        className="mb-2"
                                        placeholder="Add Program Name"
                                        name="Name"
                                        //   defaultValue={`Copy_${cloneLocation.state?.Name}`}
                                      />
                                    </Col>

                                    <Col lg={8}>
                                      <Form.Label htmlFor="customerName-field">
                                        Corrdinations
                                      </Form.Label>
                                      <InputGroup className="mb-3">
                                        <Autocomplete
                                          onPlaceChanged={onPlaceChanged}
                                          onLoad={onLoad}
                                        >
                                          <Form.Control
                                            type="text"
                                            placeholder="Origin"
                                            ref={originRef}
                                            onClick={() => {
                                              handleLocationButtonClick();
                                              map?.panTo(nom);
                                              map?.setZoom(15);
                                            }}
                                          />
                                        </Autocomplete>

                                        <Autocomplete
                                          onPlaceChanged={onPlaceChangedDest}
                                          onLoad={onLoadDest}
                                        >
                                          <Form.Control
                                            type="text"
                                            placeholder="Destination"
                                            ref={destinationRef}
                                            onClick={() => {
                                              handleLocationButtonClickDest();
                                              map?.panTo(fatma);
                                              map?.setZoom(15);
                                            }}
                                          />
                                        </Autocomplete>
                                        {loading ? (
                                          <p>Calculating route...</p>
                                        ) : (
                                          <Button
                                            type="submit"
                                            onClick={calculateRoute}
                                          >
                                            Calculate Route
                                          </Button>
                                        )}
                                      </InputGroup>
                                    </Col>
                                    <Col>
                                      {/* <Form.Label>
                                          Distance: {distance}{" "}
                                        </Form.Label>
                                        <Form.Label>
                                          Duration: {duration}{" "}
                                        </Form.Label>  */}

                                      {/* <Button
                                        aria-label="center back"
                                        onClick={() => {
                                          map?.panTo(center);
                                          map?.setZoom(15);
                                        }}
                                      >
                                        Return Center
                                      </Button> */}
                                    </Col>
                                  </Row>
                                </div>
                                <div>
                                  <Row
                                    style={{
                                      position: "relative",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      height: "250vh",
                                      width: "150vw",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        left: "0",
                                        height: "100%",
                                        width: "100%",
                                      }}
                                    >
                                      <GoogleMap
                                        center={center}
                                        zoom={15}
                                        mapContainerStyle={{
                                          width: "43%",
                                          height: "23%",
                                        }}
                                        options={{
                                          zoomControl: false,
                                          streetViewControl: false,
                                          mapTypeControl: false,
                                          fullscreenControl: false,
                                        }}
                                        onLoad={(map) => setMap(map)}
                                      >
                                        {/* Markers for origin, destination, and route */}
                                        {/* Logic to render markers based on selectedLocation, selectedDestination, and directionsResponse */}
                                        {selectedLocation && (
                                          <Marker position={nom} />
                                        )}
                                        {selectedDestination && (
                                          <Marker position={fatma} />
                                        )}
                                        {directionsResponse && (
                                          <DirectionsRenderer
                                            directions={directionsResponse}
                                          />
                                        )}
                                      </GoogleMap>
                                      <Button
                                        aria-label="center back"
                                        onClick={clearRoute}
                                        variant="danger"
                                        style={{
                                          position: "absolute",
                                          top: "10px",
                                          left: "10px",
                                          zIndex: 1000,
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {/* Phosphor "Eraser" icon */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          width="20"
                                          height="20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.146 14.146a.5.5 0 0 1-.708 0L8.5 7.207l-3.938 3.937a.5.5 0 0 1-.707-.707l4.146-4.146a1.5 1.5 0 0 1 2.121 0l6 6a.5.5 0 0 1 0 .708zM6.646 9.354a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                                          />
                                        </svg>
                                        Clear Route
                                      </Button>
                                    </div>
                                  </Row>
                                  <Row>
                                    <Col lg={12} style={{ zIndex: 10000 }}>
                                      <div className="d-flex align-items-start gap-3 mt-4">
                                        <Button
                                          type="button"
                                          className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                          onClick={() =>
                                            setactiveVerticalTab(2)
                                          }
                                        >
                                          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                          Go to Stops
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="2">
                                <div>
                                  <h5>Stops</h5>
                                </div>
                                <div>
                                  <Row
                                    style={{
                                      position: "relative",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      height: "250vh",
                                      width: "150vw",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        left: "0",
                                        height: "100%",
                                        width: "100%",
                                      }}
                                    >
                                      <GoogleMap
                                        center={center}
                                        zoom={15}
                                        mapContainerStyle={{
                                          width: "43%",
                                          height: "25%",
                                        }}
                                        options={{
                                          zoomControl: false,
                                          streetViewControl: false,
                                          mapTypeControl: false,
                                          fullscreenControl: false,
                                        }}
                                      ></GoogleMap>
                                    </div>
                                  </Row>
                                </div>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <Button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(1)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Journey
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    onClick={() => setactiveVerticalTab(3)}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Go to Run Dates
                                  </Button>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="3">
                                <Row>
                                  <div>
                                    <h5>Trip Times</h5>
                                  </div>
                                  <Col lg={5}>
                                    <InputGroup>PickUp Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                      }}
                                      defaultValue={cloneLocation.state?.Time}
                                    />
                                  </Col>
                                  <Col lg={5}>
                                    <InputGroup>DropOff Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                      }}
                                      defaultValue={cloneLocation.state?.Time}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <div>
                                    <h5>Run Dates</h5>
                                  </div>
                                  <Col lg={5}>
                                    <div className="mb-3">
                                      <Flatpickr
                                        className="form-control flatpickr-input"
                                        placeholder="Select Date"
                                        options={{
                                          dateFormat: "d M, Y",
                                        }}
                                        defaultValue={cloneLocation.state?.From}
                                      />
                                    </div>
                                  </Col>
                                  <Col className="d-flex justify-content-center align-items-center">
                                    <h5>to</h5>
                                  </Col>
                                  <Col lg={5}>
                                    <div className="mb-3">
                                      <Flatpickr
                                        className="form-control flatpickr-input"
                                        placeholder="Select Date"
                                        options={{
                                          dateFormat: "d M, Y",
                                        }}
                                        defaultValue={cloneLocation.state?.Date}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Col lg={2}></Col>
                                <Col lg={5}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="supplierName-field">
                                      Days of week not running
                                    </Form.Label>
                                    <select
                                      className="form-select"
                                      multiple
                                      aria-label="multiple select example"
                                    >
                                      <option value="No Except">
                                        No Except
                                      </option>
                                      <option value="1">Monday</option>
                                      <option value="2">Tuesday</option>
                                      <option value="3">Wednesday</option>
                                      <option value="4">Thursday</option>
                                      <option value="5">Friday</option>
                                      <option value="6">Saturday</option>
                                      <option value="7">Sunday</option>
                                    </select>
                                  </div>
                                </Col>

                                <Col lg={5}>
                                  <InputGroup>Free Days</InputGroup>
                                  <Flatpickr
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    defaultValue={cloneLocation.state?.Date}
                                  />
                                </Col>

                                <div className="d-flex align-items-start gap-3 mt-4">
                                  <Button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(2)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Stops
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    onClick={() => setactiveVerticalTab(4)}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Passengers
                                  </Button>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="4">
                                <Row>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="customerName-field">
                                        Number of passengers
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="customerName-field"
                                        required
                                        className="mb-2"
                                        name="Pax"
                                        defaultValue={
                                          cloneLocation.state?.PassengersNumber
                                        }
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={8}>
                                    <div>
                                      <h5 className="fs-14 mb-1">Extra</h5>
                                      <p className="text-muted">
                                        Slide the selected option to the right{" "}
                                      </p>
                                      <DualListBox
                                        options={options}
                                        selected={selected}
                                        onChange={(e: any) => setSelected(e)}
                                        icons={{
                                          moveLeft: (
                                            <span
                                              className="mdi mdi-chevron-left"
                                              key="key"
                                            />
                                          ),
                                          moveAllLeft: [
                                            <span
                                              className="mdi mdi-chevron-double-left"
                                              key="key"
                                            />,
                                          ],
                                          moveRight: (
                                            <span
                                              className="mdi mdi-chevron-right"
                                              key="key"
                                            />
                                          ),
                                          moveAllRight: [
                                            <span
                                              className="mdi mdi-chevron-double-right"
                                              key="key"
                                            />,
                                          ],
                                          moveDown: (
                                            <span
                                              className="mdi mdi-chevron-down"
                                              key="key"
                                            />
                                          ),
                                          moveUp: (
                                            <span
                                              className="mdi mdi-chevron-up"
                                              key="key"
                                            />
                                          ),
                                          moveTop: (
                                            <span
                                              className="mdi mdi-chevron-double-up"
                                              key="key"
                                            />
                                          ),
                                          moveBottom: (
                                            <span
                                              className="mdi mdi-chevron-double-down"
                                              key="key"
                                            />
                                          ),
                                        }}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default AddProgramm;
