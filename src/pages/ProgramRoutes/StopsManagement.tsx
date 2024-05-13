import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Tab,
  Nav,
} from "react-bootstrap";
import { useLocation} from "react-router-dom";

import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const StopsManagement = () => {
  document.title = "New Jobs | Affiliate Administration";
  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const location = useLocation();

  let program = location.state;

  console.log(program);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [stopCoordinates, setStopCoordinates] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const getConsernedStudents = (group: any,index: any) => {
    setactiveVerticalTab(index + 1)
    console.log("Conserned Students",group.students);
  }

  useEffect(() => {
    if (isLoaded && program) {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = program.stops.map((stop: any) => ({
        location: { query: stop.address }, // Use the address from autocomplete
        stopover: true,
      }));

      directionsService.route(
        {
          origin: program.origin_point.coordinates,
          destination: program.destination_point.coordinates,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints,
        },
        (result, status) => {
          if (result !== null && status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            if (result.routes && result.routes.length > 0) {
              const newStopCoordinates = result.routes[0].legs.map((leg) => ({
                lat: leg.start_location.lat(),
                lng: leg.start_location.lng(),
              }));
              setStopCoordinates(newStopCoordinates);
            } else {
              console.error("No routes found in the directions result");
            }
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [isLoaded, program]);

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapLoad = (map: any) => {
    setMap(map);
  };
  return (
    <React.Fragment>
      <Row style={{ marginTop: "100px" }}>
        <Col xl={12}>
          <Card>
            <Card.Body className="form-steps">
              <div className="vertical-navs-step">
                  <Row className="gy-5">
                    <Col lg={3}>
                      <Nav
                        as="div"
                        variant="pills"
                        className="nav flex-column custom-nav nav-pills"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        {program.students_groups.map(
                          (group: any, index: any) => (
                            <Nav.Link
                              as="button"
                              className={
                                activeVerticalTab > index
                                  ? "nav-link done"
                                  : "nav-link"
                              }
                              eventKey={index + 1}
                              onClick={() => getConsernedStudents(group, index)}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                                {group.groupName}
                              </span>
                            </Nav.Link>
                          )
                        )}

                        {/* <Nav.Link
                          as="button"
                          className={
                            activeVerticalTab > 3 ? "nav-link done" : "nav-link"
                          }
                          eventKey="3"
                          onClick={() => setactiveVerticalTab(3)}
                        >
                          <span className="step-title me-2">
                            <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                            Step 3
                          </span>
                          Payment
                        </Nav.Link>
                        <Nav.Link
                          as="button"
                          className={
                            activeVerticalTab > 4 ? "nav-link done" : "nav-link"
                          }
                          eventKey="4"
                          onClick={() => setactiveVerticalTab(4)}
                        >
                          <span className="step-title me-2">
                            <i className="ri-close-circle-fill step-icon me-2"></i>{" "}
                            Step 4
                          </span>
                          Finish
                        </Nav.Link> */}
                      </Nav>
                    </Col>
                    <Col lg={9}>
                      <div className="px-lg-4">
                      <Tab.Container activeKey={activeVerticalTab}>
                        <Tab.Content>
                          <Tab.Pane eventKey={activeVerticalTab}>
                            <div>
                              <h5
                                style={{
                                  textAlign: "center",
                                  marginBottom: "20px",
                                }}
                              >
                                {
                                  program.students_groups[activeVerticalTab - 1]
                                    .groupName
                                }
                              </h5>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>
                        <div>
                          <Row className="g-3">
                            <Col lg={12}>
                              <div style={{ height: "500px", width: "100%" }}>
                                <GoogleMap
                                  mapContainerStyle={{
                                    height: "100%",
                                    width: "100%",
                                  }}
                                  zoom={8}
                                  //center={{ lat: -34.397, lng: 150.644 }}
                                  onLoad={handleMapLoad}
                                >
                                  {/* Render directions */}
                                  {directions && (
                                    <DirectionsRenderer
                                      directions={directions}
                                      options={{
                                        polylineOptions: {
                                          strokeColor: "red",
                                          strokeOpacity: 0.8,
                                          strokeWeight: 4,
                                        },
                                      }}
                                    />
                                  )}
                                </GoogleMap>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default StopsManagement;
