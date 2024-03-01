import React, { useState, useRef, useEffect } from "react";
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

import Swal from "sweetalert2";
import "./AddProgram.css";

const options = [
  { value: "ForHandicap", label: "For Handicap" },
  { value: "Wifi", label: "Wifi" },
  { value: "WC", label: "WC" },
  { value: "AC", label: "AC" },
];

const options1 = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];
const center = { lat: 52.4862, lng: -1.8904 };

interface Recap {
  journeyName: string;
  capacityRecommanded: string;
  selected: string[];
  selected1: string[];
  stops: google.maps.LatLng[];
  // dropoffTime:Date,
  // pickupTime:Date
}

const AddProgramm = (props: any) => {
  document.title = "Program | School Administration";
  const [showAddStations, setShowAddStations] = useState<boolean>(false);

  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [journeyName, setJourneyName] = useState("");
  const [capacityRecommanded, setCapacityRecommanded] = useState("");

  const [selected, setSelected] = useState([""]);
  const [selected1, setSelected1] = useState([""]);
  // const [stops, setStops] = useState([{ id: 1 }]);
  const [searchResult, setSearchResult] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [fatma, setFatma] = useState<any>();
  const [nom, setNom] = useState<any>();
  const cloneLocation = useLocation();

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
  const [routeDirections, setRouteDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [stops, setStops] = useState<google.maps.LatLng[]>([]);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] =useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] =useState<Date | null>(null);

  const [forceRender, setForceRender] = useState(false);

  const [pathCoordinates, setPathCoordinates] = useState<google.maps.LatLng[]>(
    []
  );

  const [clickedMarkers, setClickedMarkers] = useState<number[]>([]);
  const [clickedMarker, setClickedMarker] = useState<number | null>(null);

  const [stopNames, setStopNames] = useState<string[]>([]);

  const [isMapFullScreen, setIsMapFullScreen] = useState(false);

  const [recap, setRecap] = useState<Recap>({
    journeyName: "",
    capacityRecommanded: "",
    selected: [],
    selected1: [],
    stops: [],
    // pickupTime:"",
    // dropoffTime:""
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const labels = "CDEFGHIJKLMNOPQRSTUVWXYZ";

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  useEffect(() => {
    setRecap({
      journeyName,
      capacityRecommanded,
      selected,
      selected1,
      stops,
      // dropoffTime,
      // pickupTime
    });
  }, [journeyName, capacityRecommanded, selected, selected1, stops]);

  useEffect(() => {
    const fetchLocationNames = async () => {
      const names: string[] = [];
      const geocoder = new google.maps.Geocoder();

      for (const stop of recap.stops) {
        await new Promise<void>((resolve) => {
          geocoder.geocode(
            { location: stop },
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
              if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  names.push(results[0].formatted_address);
                }
              }
              resolve();
            }
          );
        });
      }
      setStopNames(names);
    };

    if (recap.stops.length > 0) {
      fetchLocationNames();
    }
  }, [recap.stops]);

  
  const renderRecapPage = () => {
    return (
      <div>
        <h2>Resume</h2>
        <b> Journey Name: </b>
        <p> {recap.journeyName}</p>
        <b> Origin Location Name: </b>
        <p> {recap.journeyName}</p>
        <b> Desrtination Location Name: </b>
        <p> {recap.journeyName}</p>
        <b>List of stops Locations Name:</b>
        <ul>
        {stopNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
        <b>Capacity Recommended: </b> <p> {recap.capacityRecommanded}</p>
        <b> Selected Options: </b> <p>{recap.selected.join(", ")}</p>
        <b> Selected Days: </b> <p> {recap.selected1.join(", ")}</p>  
        {/* <b>PickUp Time: </b> <p> {recap.pickupTime}</p>
        <b>DropOff Time: </b> <p> {recap.dropoffTime}</p> */}
      </div>
    );
  };
  const handlePickupTimeChange = (selectedDates:any) => {
    setPickupTime(selectedDates[0]);
  };

  const isJourneyStepValid = () => {
    return (
      journeyName.trim() !== "" &&
      originRef.current?.value.trim() !== "" &&
      destinationRef.current?.value.trim() !== ""
    );
  };
  const isStopsStepValid = () => {
    return stops.length > 0;
  };

  const isTripTimesStepValid = () => {
    const pickupTimeInput = document.getElementById(
      "pickup-time"
    ) as HTMLInputElement | null;
    const dropoffTimeInput = document.getElementById(
      "dropoff-time"
    ) as HTMLInputElement | null;
    const pickupTime = pickupTimeInput?.value ?? "";
    const dropoffTime = dropoffTimeInput?.value ?? "";

    return pickupTime.trim() !== "" && dropoffTime.trim() !== "";
  };

  const isRunDatesStepValid = () => {
    const startDateInput = document.getElementById(
      "start-date"
    ) as HTMLInputElement | null;
    const endDateInput = document.getElementById(
      "end-date"
    ) as HTMLInputElement | null;

    const startDate = startDateInput?.value ?? "";
    const endDate = endDateInput?.value ?? "";
    return startDate.trim() !== "" && endDate.trim() !== "";
  };
  const isOptionsStepValid = () => {
    return selected1.length > 0;
  };

  const isFreeDaysStepValid = () => {
    const freeDateInput = document.getElementById(
      "free-date"
    ) as HTMLInputElement | null;
    const freeDate = freeDateInput?.value ?? "";
    return freeDate.trim() !== "";
  };

  const isRecommandedCapacityStepValid = () => {
    return capacityRecommanded.trim() !== "";
  };

  const isNextButtonDisabled = () => {
    switch (activeVerticalTab) {
      case 1:
        return !isJourneyStepValid();
      case 2:
        return !isStopsStepValid();
      case 3:
        return (
          !isTripTimesStepValid() ||
          !isRunDatesStepValid() ||
          !isOptionsStepValid() ||
          !isFreeDaysStepValid()
        );
      case 4:
        return !isRecommandedCapacityStepValid();
      default:
        return false;
    }
  };
  const handleNextStep = () => {
    if (!isNextButtonDisabled()) {
      setactiveVerticalTab(activeVerticalTab + 1);
    } else {
      alert("Please fill all required fields before proceeding.");
    }
  };
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
          setRouteDirections(result);
          // const pointToCheck = new google.maps.LatLng(49.95, -128.1);
          // const route = result.routes[0];
          // const path = route.overview_path;
          // const tolerance = 0.0001;
          // const isPointOnRoute = path.some((path: any) => {
          //   return google.maps.geometry.poly.isLocationOnEdge(
          //     pointToCheck,
          //     path,
          //     tolerance
          //   );
          // });

          // if (isPointOnRoute) {
          //   console.log("The point is on the route.");
          // } else {
          //   console.log("The point is not on the route.");
          // }

          const selectedRoute = result.routes.find(
            (route) =>
              route.legs[0].start_address === originRef.current.value &&
              route.legs[0].end_address === destinationRef.current.value
          );
        
          if (!selectedRoute!) {
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

  const isPositionCloseToRoute = (
    position: google.maps.LatLng,
    tolerance: number
  ): boolean => {
    if (!routeDirections) return false;

    const route = routeDirections.routes[0];
    const path = route.overview_path;
    for (const pathPoint of path) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        position,
        pathPoint
      );
      if (distance <= tolerance) {
        return true;
      }
    }
    return false;
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedPosition = new google.maps.LatLng(
      event.latLng.lat(),
      event.latLng.lng()
    );
    const tolerance = 30;
    const isCloseToRoute = isPositionCloseToRoute(clickedPosition, tolerance);

    if (isCloseToRoute) {
      console.log("Marker added at position:", clickedPosition);
      setStops((prevStops: google.maps.LatLng[]) => [
        ...prevStops,
        clickedPosition,
      ]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...! Something went wrong!",
        text: "Marker not added. Position too far from the route.",
        customClass: {
          container: isMapFullScreen ? "fullscreen-swal" : "",
          popup: "fullscreen-swal-popup",
        },
      });
    }
  };

  const handleMarkerClick = (index: number) => {
    if (clickedMarkers.includes(index)) {
      setClickedMarkers((prevClickedMarkers) =>
        prevClickedMarkers.filter((clickedIndex) => clickedIndex !== index)
      );
    } else {
      setClickedMarkers((prevClickedMarkers) => [...prevClickedMarkers, index]);
    }
  };

  const handleMarkerDoubleClick = (index: number) => {
    setStops((prevStops) => prevStops.filter((_, i) => i !== index));
    setClickedMarkers((prevClickedMarkers) =>
      prevClickedMarkers.filter((clickedIndex) => clickedIndex !== index)
    );
  };

  const handleToggleFullScreen = () => {
    setIsMapFullScreen(!isMapFullScreen);
  };

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
                <Card.Body className="form-steps" style={{ height: "80vh" }}>
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
                              // onClick={() => setactiveVerticalTab(2)}
                              onClick={() => {
                                if (isJourneyStepValid()) {
                                  setactiveVerticalTab(2);
                                } else {
                                  alert(
                                    "Please fill all required fields before proceeding."
                                  );
                                }
                              }}
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
                              // onClick={() => setactiveVerticalTab(3)}
                              onClick={() => {
                                if (isStopsStepValid()) {
                                  setactiveVerticalTab(3);
                                } else {
                                  alert(
                                    "Please fill all required fields before proceeding."
                                  );
                                }
                              }}
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
                              // onClick={() => setactiveVerticalTab(4)}

                              onClick={() => {
                                if (
                                  isTripTimesStepValid() &&
                                  isRunDatesStepValid() &&
                                  isOptionsStepValid() &&
                                  isFreeDaysStepValid()
                                ) {
                                  setactiveVerticalTab(4);
                                } else {
                                  alert(
                                    "Please fill all required fields before proceeding."
                                  );
                                }
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Options
                            </Nav.Link>

                            <Nav.Link
                              as="button"
                              className={
                                activeVerticalTab > 5
                                  ? "nav-link done"
                                  : "nav-link"
                              }
                              eventKey="5"
                              // onClick={() => setactiveVerticalTab(5)}
                              onClick={() => {
                                if (isRecommandedCapacityStepValid()) {
                                  setactiveVerticalTab(5);
                                } else {
                                  alert(
                                    "Please fill all required fields before proceeding."
                                  );
                                }
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                              </span>
                              Resume
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
                                      <Form.Label htmlFor="Name">
                                        Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="Name"
                                        required
                                        className="mb-2"
                                        placeholder="Add Program Name"
                                        name="Name"
                                        value={journeyName}
                                        onChange={(e) =>
                                          setJourneyName(e.target.value)
                                        }
                                      />
                                    </Col>

                                    <Col lg={8}>
                                      <Form.Label htmlFor="customerName-field">
                                        coordinations
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
                                      height: "50vh",
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
                                          width: isMapFullScreen
                                            ? "100vw"
                                            : "43%",
                                          height: isMapFullScreen
                                            ? "100vh"
                                            : "120%",
                                        }}
                                        options={{
                                          zoomControl: false,
                                          streetViewControl: false,
                                          mapTypeControl: false,
                                          fullscreenControl: true,

                                          fullscreenControlOptions: {
                                            position:
                                              google.maps.ControlPosition
                                                .TOP_RIGHT,
                                          },
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
                                </div>

                                <div
                                  className="d-flex align-items-start"
                                  style={{ marginTop: "110px" }}
                                >
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    // onClick={() => setactiveVerticalTab(2)}

                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Add Stops
                                  </Button>
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
                                      height: "50vh",
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
                                          width: isMapFullScreen
                                            ? "100vw"
                                            : "43%",
                                          height: isMapFullScreen
                                            ? "100vh"
                                            : "120%",
                                        }}
                                        options={{
                                          zoomControl: false,
                                          streetViewControl: false,
                                          mapTypeControl: false,
                                          fullscreenControl: true,

                                          fullscreenControlOptions: {
                                            position:
                                              google.maps.ControlPosition
                                                .TOP_RIGHT,
                                          },
                                        }}
                                        onClick={handleMapClick}
                                      >
                                        {routeDirections && (
                                          <DirectionsRenderer
                                            directions={routeDirections}
                                          />
                                        )}
                                        {stops.map((stop, index) => (
                                          <Marker
                                            key={index}
                                            position={stop}
                                            label={
                                              labels[index % labels.length]
                                            }
                                            onClick={() =>
                                              handleMarkerClick(index)
                                            }
                                            onDblClick={() =>
                                              handleMarkerDoubleClick(index)
                                            }
                                            icon={{
                                              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                              scaledSize:
                                                new window.google.maps.Size(
                                                  50,
                                                  50
                                                ),
                                            }}
                                          />
                                        ))}
                                      </GoogleMap>
                                    </div>
                                  </Row>
                                </div>
                                <div
                                  className="d-flex align-items-start gap-3"
                                  style={{ marginTop: "120px" }}
                                >
                                  <Button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(1)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                    Back to Journey
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    // onClick={() => setactiveVerticalTab(3)}

                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Set Run Dates
                                  </Button>

                                  {/* Button to toggle full screen mode */}
                                  {/* <Button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleToggleFullScreen}
                                  >
                                    {isMapFullScreen
                                      ? "Exit Full Screen"
                                      : "Full Screen"}
                                  </Button> */}
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="3">
                                <Row>
                                  <div className="mt-2">
                                    <h5>Trip Times</h5>
                                  </div>
                                  <Col lg={5}>
                                    <InputGroup>PickUp Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      id="pickup-time"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                        onChange: handlePickupTimeChange
                                      }}
                                     
                                    />
                                  </Col>

                                  <Col className="d-flex justify-content-center align-items-center"></Col>
                                  <Col lg={5}>
                                    <InputGroup>DropOff Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      id="dropoff-time"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <div className="mt-2">
                                    <h5>Run Dates</h5>
                                  </div>
                                  <Col lg={5}>
                                    <InputGroup>Start Date</InputGroup>
                                    <div className="mb-3">
                                      <Flatpickr
                                        className="form-control flatpickr-input"
                                        id="start-date"
                                        placeholder="Select Date"
                                        options={{
                                          dateFormat: "d M, Y",
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col className="d-flex justify-content-center align-items-center">
                                    <h5>to</h5>
                                  </Col>
                                  <Col lg={5}>
                                    <InputGroup>End Date</InputGroup>

                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      id="end-date"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <div className="mt-2">
                                    <h5>Free Days</h5>
                                  </div>
                                  <Col lg={5}>
                                    <Flatpickr
                                      className="form-control flatpickr-input"
                                      id="free-date"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                        mode: "multiple",
                                      }}
                                    />
                                  </Col>
                                </Row>{" "}
                                <Row>
                                  <Col lg={12}>
                                    <div className="mt-2">
                                      <h5 className="fs-14 mb-1">
                                        Days of week not running
                                      </h5>
                                      <p className="text-muted">
                                        Slide the selected excepted days to the
                                        right
                                      </p>
                                      <DualListBox
                                        options={options1}
                                        selected={selected1}
                                        onChange={(e: any) => setSelected1(e)}
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
                                <div
                                  className="d-flex align-items-start gap-3"
                                  style={{ marginTop: "100px" }}
                                >
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
                                    // onClick={() => setactiveVerticalTab(4)}

                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Add Options
                                  </Button>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="4">
                                <Row>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="Pax">
                                        Recommanded Capacity
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="Pax"
                                        required
                                        className="mb-2"
                                        name="Pax"
                                        value={capacityRecommanded}
                                        onChange={(e) =>
                                          setCapacityRecommanded(e.target.value)
                                        }
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12}>
                                    <div>
                                      <h5 className="fs-14 mb-1">Extra</h5>
                                      <p className="text-muted">
                                        Slide the selected option to the right
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
                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <Form.Label htmlFor="VertimeassageInput">
                                        Notes
                                      </Form.Label>
                                      <textarea
                                        className="form-control"
                                        id="VertimeassageInput"
                                        rows={5}
                                        placeholder="Enter your notes"
                                      ></textarea>
                                    </div>
                                  </Col>
                                </Row>

                                <div
                                  className="d-flex align-items-start gap-3"
                                  style={{ marginTop: "100px" }}
                                >
                                  <Button
                                    type="button"
                                    className="btn btn-light btn-label previestab"
                                    onClick={() => setactiveVerticalTab(3)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Run Dates
                                  </Button>

                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Go To Resume
                                  </Button>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="5">
                                {renderRecapPage()}
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
