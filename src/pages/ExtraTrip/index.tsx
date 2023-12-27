import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Nav,
  ProgressBar,
  Row,
  Tab,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

import Flatpickr from "react-flatpickr";

import { GoogleApiWrapper, Map } from "google-maps-react";

const LoadingContainer = () => <div>Loading...</div>;
const ExtraTrip = (props: any) => {
  document.title = "Extra Trip | School Administration";
  const [activeTab, setactiveTab] = useState<number>(0);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [isReturnSelected, setIsReturnSelected] = useState(true);

  const [collectionAddress, setCollectionAddress] = useState("");
  const [extraDropsAddress, setExtraDropsAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  const [showCollectionMap, setShowCollectionMap] = useState(false);
  const [showExtraDropsMap, setShowExtraDropsMap] = useState(false);
  const [showDestinationMap, setShowDestinationMap] = useState(false);

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const updateMap = () => {
    console.log(
      "Updating map with addresses:",
      collectionAddress,
      destinationAddress,
      extraDropsAddress
    );
  };

  useEffect(() => {
    updateMap();
  }, [collectionAddress, destinationAddress, extraDropsAddress]);

  const handleCollectionAddressChange = (value: any) => {
    setCollectionAddress(value);
  };

  const handleDestinationAddressChange = (value: any) => {
    setDestinationAddress(value);
  };

  const handleExtraDropsAddressChange = (value: any) => {
    setExtraDropsAddress(value);
  };

  const locations = [
    { label: "Gatwick North Terminal", value: "Gatwick North Terminal" },
    {
      label:
        "North Terminal, LGW Airport, Gatwick Airport, England RH6 0PJ, United Kingdom",
      value:
        "North Terminal, LGW Airport, Gatwick Airport, England RH6 0PJ, United Kingdom",
    },
    {
      label:
        "Gate 25, South Terminal, Gatwick Airport, England RH6 0PJ, United Kingdom",
      value:
        "Gate 25, South Terminal, Gatwick Airport, England RH6 0PJ, United Kingdom",
    },
    {
      label:
        "Loaf, 61 Sandgate High St, Folkestone, England CT20 3AH, United Kingdom",
      value:
        "Loaf, 61 Sandgate High St, Folkestone, England CT20 3AH, United Kingdom",
    },
  ];

  // const handleCollectionAddressChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const location = e.target.value;
  //   setCollectionAddress(location);
  //   setShowCollectionMap(true);
  //   setShowExtraDropsMap(false);
  //   setShowDestinationMap(false);
  // };

  // const handleExtraDropsAddressChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const location = e.target.value;
  //   setExtraDropsAddress(location);
  //   setShowCollectionMap(false);
  //   setShowExtraDropsMap(true);
  //   setShowDestinationMap(false);
  // };

  // const handleDestinationAddressChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const location = e.target.value;
  //   setDestinationAddress(location);
  //   setShowCollectionMap(false);
  //   setShowExtraDropsMap(false);
  //   setShowDestinationMap(true);
  // };

  const handleClick = () => {
    setShowExtraContent(!showExtraContent);
  };

  const handleRadioChange = (event: any) => {
    setIsReturnSelected(event.target.id === "flexRadioDefault1");
  };
  const rowStyle = {
    cursor: "pointer",
    textDecoration: showExtraContent ? "underline solid" : "none",
    color: showExtraContent ? "FireBrick" : "BlueViolet",
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Extra Trip" pageTitle="Tools" />
          <Col xl={12}>
            <Card>
              <Card.Header>
                <h4 className="card-title mb-0">Online Quote</h4>
              </Card.Header>
              <Card.Body className="form-steps">
                <Form action="#">
                  <Tab.Container activeKey={activeTab}>
                    <div id="custom-progress-bar" className="progress-nav mb-4">
                      <div>
                        <ProgressBar
                          now={activeTab * 50}
                          style={{ height: "1px" }}
                        ></ProgressBar>
                      </div>

                      <Nav
                        as="ul"
                        variant="pills"
                        className="progress-bar-tab custom-nav"
                      >
                        <Nav.Item as="li">
                          <Nav.Link
                            as="button"
                            eventKey="0"
                            onClick={() => setactiveTab(0)}
                            className="rounded-pill"
                          >
                            1
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link
                            as="button"
                            eventKey="1"
                            onClick={() => setactiveTab(1)}
                            className="rounded-pill"
                          >
                            2
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link
                            as="button"
                            eventKey="2"
                            onClick={() => setactiveTab(2)}
                            className="rounded-pill"
                          >
                            3
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    <Tab.Content>
                      <Tab.Pane
                        eventKey="0"
                        id="pills-gen-info"
                        role="tabpanel"
                        aria-labelledby="pills-gen-info-tab"
                      >
                        <Row className="d-flex justify-content-center" style={{ marginBottom: "20px" }}>
                          <Col lg={4} md={6} style={{ marginBottom: "30px" }}>
                            <div className="d-flex justify-content-between">
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  onChange={handleRadioChange}
                                  checked={!isReturnSelected}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                >
                                  One Way
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  onChange={handleRadioChange}
                                  checked={isReturnSelected}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  Return
                                </label>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          {/* PickUp Date */}
                          <Col lg={3}>
                            <div style={{ margin: "10px" }}>
                              <Form.Label className="form-label mb-0">
                                PickUp Date
                              </Form.Label>
                              <Flatpickr
                                className="form-control"
                                options={{
                                  dateFormat: "d M, Y",
                                }}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div
                              style={{ margin: "10px", paddingLeft: "10px" }}
                            >
                              <Form.Label className="form-label mb-0">
                                PickUp Time
                              </Form.Label>
                              <Flatpickr
                                className="form-control"
                                options={{
                                  enableTime: true,
                                  noCalendar: true,
                                  dateFormat: "H:i",
                                }}
                              />
                            </div>
                          </Col>

                          {/* Return Date */}
                          {isReturnSelected && (
                            <>
                              <Col lg={3}>
                                <div style={{ margin: "10px" }}>
                                  <Form.Label className="form-label mb-0">
                                    Return Date
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div
                                  style={{
                                    margin: "10px",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  <Form.Label className="form-label mb-0">
                                    Return Time
                                  </Form.Label>
                                  <Flatpickr
                                    className="form-control"
                                    options={{
                                      enableTime: true,
                                      noCalendar: true,
                                      dateFormat: "H:i",
                                    }}
                                  />
                                </div>
                              </Col>
                            </>
                          )}
                        </Row>

                        <Row  style={{ marginTop: "20px" }}>
                          {/* Collection Address */}
                          <Col lg={4}>
                            <div style={{ margin: "10px" }}>
                              <Form.Label className="form-label mb-0">
                                Collection Address
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="collectionAddressSelect"
                                required
                                onChange={(e) =>
                                  handleCollectionAddressChange(e.target.value)
                                }
                              >
                                <option value="">Select location</option>
                                {locations.map((location) => (
                                  <option
                                    key={location.value}
                                    value={location.value}
                                  >
                                    {location.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>

                          {/* Destination Address */}
                          <Col lg={4}>
                            <div style={{ margin: "10px" }}>
                              <Form.Label className="form-label mb-0">
                                Destination Address
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="destinationAddressSelect"
                                required
                                onChange={(e) =>
                                  handleDestinationAddressChange(e.target.value)
                                }
                              >
                                <option value="">Select location</option>
                                {locations.map((location) => (
                                  <option
                                    key={location.value}
                                    value={location.value}
                                  >
                                    {location.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>

                          {/* Extra Drops Address */}
                          <Col lg={4}>
                            <div style={{ margin: "10px" }}>
                              <Form.Label
                                className="form-label mb-0"
                                   
                              >
                                Extra Drops
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="choices-single-default"
                                id="extraDropsAddressSelect"
                                required
                                onChange={(e) =>
                                  handleExtraDropsAddressChange(e.target.value)
                                }
                              >
                                <option value="">Select location</option>
                                {locations.map((location) => (
                                  <option
                                    key={location.value}
                                    value={location.value}
                                  >
                                    {location.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>

                          {/* Map for all addresses */}
                          <Col lg={12}>
                            {collectionAddress ||
                            destinationAddress ||
                            extraDropsAddress ? (
                              <div
                                style={{
                                  position: "relative",
                                  height: "400px",
                                  marginTop: "10px",
                                }}
                              >
                                {/*Map component */}
                                <Map
                                  google={props.google}
                                  zoom={13}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    height: "100%",
                                    width: "100%",
                                  }}
                                 
                                  collectionAddress={collectionAddress}
                                  destinationAddress={destinationAddress}
                                  extraDropsAddress={extraDropsAddress}
                                />
                              </div>
                            ) : (
                              <p>
                                Select at least one address to display the map.
                              </p>
                            )}
                          </Col>
                        </Row>

                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            onClick={() => setactiveTab(1)}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Go to more info
                          </button>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane
                        eventKey="1"
                        id="pills-info-desc"
                        role="tabpanel"
                        aria-labelledby="pills-info-desc-tab"
                      >
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              htmlFor="statusSelect"
                              className="form-label"
                            >
                              Number of passengers:
                            </label>
                            <select
                              className="form-select text-muted"
                              name="choices-single-default"
                              id="statusSelect"
                              required
                            >
                              <option value="">Passengers</option>
                              <option value="1 Passenger">1 Passenger</option>
                              <option value="2 Passengers">2 Passengers</option>
                              <option value="3 Passengers">3 Passengers</option>
                              <option value="4 Passengers">4 Passengers</option>
                              <option value="5 Passengers">5 Passengers</option>
                              <option value="6 Passengers">6 Passengers</option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              htmlFor="statusSelect"
                              className="form-label"
                            >
                              Vehicle Type:
                            </label>
                            <select
                              className="form-select text-muted"
                              name="choices-single-default"
                              id="statusSelect"
                              required
                            >
                              <option value="">Select Vehicle</option>
                              <option value="Standar Saloon Car">
                                Standar Saloon Car
                              </option>
                              <option value="Executive Saloon Car">
                                Executive Saloon Car
                              </option>
                              <option value="VIP Saloon Car">
                                VIP Saloon Car
                              </option>
                              <option value=">Standard 6 Seat MPV">
                                Standard 6 Seat MPV
                              </option>
                              <option value="Executive 6 Seat MPV">
                                Executive 6 Seat MPV
                              </option>
                              <option value="10-16 Seat Standard Minibus">
                                10-16 Seat Standard Minibus
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              htmlFor="statusSelect"
                              className="form-label"
                            >
                              Luggage Details:
                            </label>
                            <select
                              className="form-select text-muted"
                              name="choices-single-default"
                              id="statusSelect"
                              required
                            >
                              <option value="">Select Luggage</option>
                              <option value="No Luggage">No Luggage</option>
                              <option value="Lap Luggage Only">
                                Lap Luggage Only
                              </option>
                              <option value="1 X 20Kg Check in luggage per person only">
                                1 X 20Kg Check in luggage per person only
                              </option>
                              <option value="1 X 10Kg Hand in luggage per person only">
                                1 X 10Kg Hand in luggage per person only
                              </option>
                              <option value="1 X 22Kg Check in luggage and 1 X 10Kg Hand Luggage per person">
                                1 X 22Kg Check in luggage and 1 X 10Kg Hand
                                Luggage per person
                              </option>
                              <option value="1 X 10Kg Hand in luggage and 1 X small sports kit bag each">
                                1 X 10Kg Hand luggage and 1 X small sports kit
                                bag each
                              </option>
                              <option value="1 Set of golf clubs each">
                                1 Set of golf clubs each
                              </option>
                              <option value="1 X 10Kg Hand luggage and 1 set golf clubs each">
                                1 X 10Kg Hand luggage and 1 set golf clubs each
                              </option>
                              <option value="More than 2 X 22Kg Check in luggage each (must be discussed with a sales rep)">
                                More than 2 X 22Kg Check in luggage each (must
                                be discussed with a sales rep)
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              htmlFor="statusSelect"
                              className="form-label"
                            >
                              Journey Type:
                            </label>
                            <select
                              className="form-select text-muted"
                              name="choices-single-default"
                              id="statusSelect"
                              required
                            >
                              <option value="">Select Journey Type</option>
                              <option value="Airport Transfer">
                                Airport Transfer
                              </option>
                              <option value="Charity Event">
                                Charity Event
                              </option>
                              <option value="Sporting Event">
                                Sporting Event
                              </option>
                              <option value="Day Trip">Day Trip</option>
                              <option value="Site Tour">Site Tour</option>
                              <option value="School Or University Educational Trip">
                                School Or University Educational Trip
                              </option>
                              {/* <option value="Sports Team(Players Transport)">Sports Team(Players Transport)</option> */}
                              <option value="Emergency">Emergency</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <Form.Label htmlFor="gen-info-description-input">
                            Notes
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Enter Note"
                            id="gen-info-description-input"
                            rows={2}
                          />
                        </Col>

                        <div className="d-flex align-items-start gap-3 mt-4">
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none btn-label previestab"
                            onClick={() => setactiveTab(0)}
                          >
                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                            Back
                          </button>
                          <button
                            type="button"
                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                            onClick={() => setactiveTab(2)}
                          >
                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                            Submit
                          </button>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane
                        eventKey="2"
                        id="pills-success"
                        role="tabpanel"
                        aria-labelledby="pills-success-tab"
                      >
                        <div>
                          <div className="text-center">
                            <div className="mb-4">
                              {/* <lord-icon src="https://cdn.lordicon.com/lupuorrc.json" trigger="loop" colors="primary:#0ab39c,secondary:#405189" style="width:120px;height:120px"></lord-icon> */}
                            </div>
                            <h5>Well Done !</h5>
                            <p className="text-muted">
                              You have successfully submitted the quote.
                            </p>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
  LoadingContainer: LoadingContainer,
  v: "3",
})(ExtraTrip);
