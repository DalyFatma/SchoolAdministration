import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Tab, Nav, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Select from "react-select";

import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import SelectionStudentStops from "./SelectionStudentStops";
import "./SelectionStudentStop.css";

import start_clicked from "../../assets/images/start_clicked.png";
import start_unclicked from "../../assets/images/start_unclicked.png";
import dest_clicked from "../../assets/images/dest_clicked.png";
import dest_unclicked from "../../assets/images/dest_unclicked.png";

const StopsManagementOLD = () => {
  document.title = "New Jobs | Affiliate Administration";
  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(-1);
  const [postion, setPosition] = useState<any>(null);

  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const location = useLocation();

  let program = location.state;
  const [students, setStudents] = useState<any[]>(
    program.students_groups[0].students
  );

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

  const [options, setOptions] = useState<any[]>([]);

  const [currentGroup, setCurrentGroup] = useState<string>("");

  const [toBeSentData, setToBeSentData] = useState<any[]>([]);

  //const options: any[] = [
  /* { value: "Choice 1", label: "Choice 1", custom: {
      id: 'ch1',name: "fatma"
    } },
    { value: "Choice 2", label: "Choice 2", custom: {
      id: 'ch2',name: "fatma2"
    }  },
    { value: "Choice 3", label: "Choice 3", custom: {
      id: 'ch3',name: "fatma3"
    }  },
    { value: "Choice 4", label: "Choice 4", custom: {
      id: 'ch4',name: "fatm4"
    }  }, */
  //]

  // State to store the selected option values
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  // Event handler to handle changes in selected options
  const handleSelectValueChange = (selectedOption: any) => {
    console.log("selectedOption", selectedOption);
    setSelectedValues(selectedOption);
    let currentG = currentGroup;
    console.log("currentG", currentG);
    const indexOfCurrentGroup = program.students_groups.findIndex(
      (group: any) => group.groupName === currentG
    );
    console.log("indexOfCurrentGroup", indexOfCurrentGroup);
    let currentPosition = postion.details;
    console.log("currentPosition", currentPosition);
    let to_be_sent_data = [...toBeSentData];
    console.log("toBeSentData", to_be_sent_data);

    const indexOfTargetPosition = to_be_sent_data[
      indexOfCurrentGroup
    ].findIndex(
      (data: any) => data.stop.placeName === currentPosition.placeName
    );
    console.log("indexOfTargetPosition", indexOfTargetPosition);
    to_be_sent_data[indexOfCurrentGroup][indexOfTargetPosition].students =
      selectedOption;
    setToBeSentData(to_be_sent_data);

    // let arr: any[] = [];
    // for (let i = 0; i < students.length;i++) {
    //   for(let j = 0; j < selectedOption.length;j++){
    //     if(students[i]?._id! !== selectedOption[j]?.value!){
    //       arr.push({
    //         value: students[i]._id,
    //         label: students[i].firstName + students[i].lastName,
    //       });
    //     }
    //   }
    // }

    // console.log("Array Here",arr);
    let prevOptions = [...options];
    const newArray: any[] = prevOptions.filter(
      (obj1) => !selectedOption.some((obj2: any) => obj1.value === obj2.value)
    );
    console.log("newArray", newArray);
    let arr: any[] = [];
    for (let i = 0; i < newArray.length; i++) {
      arr.push({
        value: newArray[i].value,
        label: newArray[i].label,
      });
    }
    setOptions(arr);
  };

  const getConsernedStudents = (group: any, index: any) => {
    setactiveVerticalTab(index + 1);
    console.log("Conserned Students", group.students);
    setStudents(group.students);

    let arr: any[] = [];
    for (let student of group.students) {
      arr.push({
        value: student._id,
        label: student.firstName + student.lastName,
      });
    }

    setOptions(arr);

    setCurrentGroup(group.groupName);

    let currentG = group.groupName;
    console.log("currentG", currentG);

    let indexOfCurrentGroup = 0;

    for (let group of program.students_groups) {
      if (group.groupName === currentG) {
        indexOfCurrentGroup = program.students_groups.indexOf(group);
      }
    }

    //const indexOfCurrentGroup = program.students_groups.findIndex((group: any) => group.groupName === currentG);
    console.log("indexOfCurrentGroup", indexOfCurrentGroup);
    let currentPosition = postion;

    console.log("currentPosition", currentPosition);
    let to_be_sent_data = [...toBeSentData];
    console.log("toBeSentData", to_be_sent_data);

    let indexOfTargetPosition = 0;

    for (let data of to_be_sent_data[indexOfCurrentGroup]) {
      if (data.stop.placeName === currentPosition.placeName) {
        indexOfTargetPosition =
          to_be_sent_data[indexOfCurrentGroup].indexOf(data);
      }
    }

    //const indexOfTargetPosition = to_be_sent_data[indexOfCurrentGroup].findIndex((data: any) => data.stop.placeName === currentPosition.placeName);
    console.log("indexOfTargetPosition", indexOfTargetPosition);
    setSelectedValues(
      to_be_sent_data[indexOfCurrentGroup][indexOfTargetPosition].students
    );
  };

  useEffect(() => {
    if (isLoaded && program) {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = program.stops.map((stop: any) => ({
        location: { query: stop.address.placeName }, // Use the address from autocomplete
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
            console.log(result);
            setDirections(result);
            if (result.routes && result.routes.length > 0) {
              const newStopCoordinates = result.routes[0].legs.map((leg) => ({
                lat: leg.start_location.lat(),
                lng: leg.start_location.lng(),
              }));
              setStopCoordinates(newStopCoordinates);

              let arr: any[] = [];

              let toBeSentArr: any[] = [];

              for (let student of students) {
                arr.push({
                  value: student._id,
                  label: student.firstName + student.lastName,
                });
              }

              for (let group of program.students_groups) {
                let subArray: any = [];

                subArray.push({
                  stop: program.origin_point,
                  students: [],
                });

                for (let stop of program.stops) {
                  subArray.push({
                    stop: stop.address,
                    students: [],
                  });
                }

                subArray.push({
                  stop: program.destination_point,
                  students: [],
                });

                toBeSentArr.push(subArray);
              }

              setOptions(arr);

              setToBeSentData(toBeSentArr);

              setCurrentGroup(program.students_groups[0].groupName);

              handleStartPointMarkerClick(program.students_groups[0].groupName);
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

  const handleStopMarkerClick = (stop: any, index: any) => {
    console.log("Clicked Stop", stop);
    console.log("Curent Students", students);
    setClickedMarkerIndex(index);
    setPosition({
      type: "Stop",
      details: stop.address,
    });

    let currentG = currentGroup;
    console.log("currentG", currentG);

    const indexOfCurrentGroup = program.students_groups.findIndex(
      (group: any) => group.groupName === currentG
    );
    console.log("indexOfCurrentGroup", indexOfCurrentGroup);
    let currentPosition = stop.address;

    console.log("currentPosition", currentPosition);
    let to_be_sent_data = [...toBeSentData];
    console.log("toBeSentData", to_be_sent_data);

    const indexOfTargetPosition = to_be_sent_data[
      indexOfCurrentGroup
    ].findIndex(
      (data: any) => data.stop.placeName === currentPosition.placeName
    );
    console.log("indexOfTargetPosition", indexOfTargetPosition);
    setSelectedValues(
      to_be_sent_data[indexOfCurrentGroup][indexOfTargetPosition].students
    );
  };

  const handleStartPointMarkerClick = (firstGroupName: string) => {
    console.log(firstGroupName);
    setClickedMarkerIndex(-1);
    setPosition({
      type: "Start point",
      details: program.origin_point,
    });

    let currentG = "";

    if (firstGroupName === "") {
      currentG = currentGroup;
    } else {
      currentG = firstGroupName;
    }

    console.log("currentG", currentG);

    const indexOfCurrentGroup = program.students_groups.findIndex(
      (group: any) => group.groupName === currentG
    );
    console.log("indexOfCurrentGroup", indexOfCurrentGroup);
    let currentPosition = program.origin_point;

    console.log("currentPosition", currentPosition);
    let to_be_sent_data = [...toBeSentData];
    console.log("toBeSentData", to_be_sent_data);

    const indexOfTargetPosition = to_be_sent_data[
      indexOfCurrentGroup
    ].findIndex(
      (data: any) => data.stop.placeName === currentPosition.placeName
    );
    console.log("indexOfTargetPosition", indexOfTargetPosition);
    setSelectedValues(
      to_be_sent_data[indexOfCurrentGroup][indexOfTargetPosition].students
    );
  };

  const handleDestinationPointMarkerClick = () => {
    setClickedMarkerIndex(program.stops.length);
    setPosition({
      type: "Destination point",
      details: program.destination_point,
    });

    let currentG = currentGroup;
    console.log("currentG", currentG);

    const indexOfCurrentGroup = program.students_groups.findIndex(
      (group: any) => group.groupName === currentG
    );
    console.log("indexOfCurrentGroup", indexOfCurrentGroup);
    let currentPosition = program.destination_point;

    console.log("currentPosition", currentPosition);
    let to_be_sent_data = [...toBeSentData];
    console.log("toBeSentData", to_be_sent_data);

    const indexOfTargetPosition = to_be_sent_data[
      indexOfCurrentGroup
    ].findIndex(
      (data: any) => data.stop.placeName === currentPosition.placeName
    );
    console.log("indexOfTargetPosition", indexOfTargetPosition);
    setSelectedValues(
      to_be_sent_data[indexOfCurrentGroup][indexOfTargetPosition].students
    );
  };

  const handleSelectionChange = (selected: any) => {
    console.log("selected", selected);
    let prevSelection = [...selectedStudents];
    console.log("prevSelection", prevSelection);
    // for (let i = prevSelection; i < selected.length; i++) {
    //   prevSelection.push({
    //     id: selected[]
    //   })
    // }
    setSelectedStudents(selected);
  };

  const customStyles = {
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: "#4b93ff",
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#4b93ff",
      color: "white",
      //    borderRadius: "50px"
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      backgroundColor: "#4b93ff",
      ":hover": {
        backgroundColor: "#4b93ff",
        color: "white",
      },
    }),
  };

  return (
    <React.Fragment>
      <Row style={{ marginTop: "100px" }}>
        <Col xl={12}>
          <Card>
            <Card.Body className="form-steps">
              <div className="vertical-navs-step">
                <Row className="gy-5">
                  <Col lg={2}>
                    <Nav
                      as="div"
                      variant="pills"
                      className="nav flex-column custom-nav nav-pills"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {program.students_groups.map((group: any, index: any) => (
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
                      ))}

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
                  <Col lg={10}>
                    <div className="px-lg-4">
                      <div>
                        <Row className="g-3">
                          <Col lg={6}>
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
                                      suppressMarkers: true,
                                    }}
                                  />
                                )}
                                {clickedMarkerIndex === -1 ? (
                                  <Marker
                                    position={program.origin_point.coordinates}
                                    onClick={() =>
                                      handleStartPointMarkerClick("")
                                    }
                                    icon={{
                                      url: start_clicked,
                                      scaledSize: new window.google.maps.Size(
                                        40,
                                        40
                                      ),
                                    }}
                                  />
                                ) : (
                                  <Marker
                                    position={program.origin_point.coordinates}
                                    onClick={() =>
                                      handleStartPointMarkerClick("")
                                    }
                                    icon={{
                                      url: start_unclicked,
                                      scaledSize: new window.google.maps.Size(
                                        40,
                                        40
                                      ),
                                    }}
                                  />
                                )}

                                {program.stops.map((stop: any, index: any) => (
                                  <Marker
                                    key={index}
                                    position={{
                                      lat: Number(
                                        stop?.address?.coordinates?.lat
                                      ),
                                      lng: Number(
                                        stop?.address?.coordinates?.lng
                                      ),
                                    }}
                                    onClick={() =>
                                      handleStopMarkerClick(stop, index)
                                    }
                                    icon={{
                                      path: google.maps.SymbolPath.CIRCLE,
                                      fillColor:
                                        clickedMarkerIndex === index
                                          ? "#32CD32"
                                          : "#FF0000",
                                      fillOpacity: 1,
                                      strokeColor: "black",
                                      strokeWeight: 1,
                                      scale: 8,
                                    }}
                                  />
                                ))}

                                {clickedMarkerIndex === program.stops.length ? (
                                  <Marker
                                    position={
                                      program.destination_point.coordinates
                                    }
                                    onClick={() =>
                                      handleDestinationPointMarkerClick()
                                    }
                                    icon={{
                                      url: dest_clicked,
                                      scaledSize: new window.google.maps.Size(
                                        40,
                                        40
                                      ),
                                    }}
                                  />
                                ) : (
                                  <Marker
                                    position={
                                      program.destination_point.coordinates
                                    }
                                    onClick={() =>
                                      handleDestinationPointMarkerClick()
                                    }
                                    icon={{
                                      url: dest_unclicked,
                                      scaledSize: new window.google.maps.Size(
                                        40,
                                        40
                                      ),
                                    }}
                                  />
                                )}
                              </GoogleMap>
                            </div>
                          </Col>
                          <Col lg={6}>
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
                                        program.students_groups[
                                          activeVerticalTab - 1
                                        ].groupName
                                      }
                                    </h5>
                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </Tab.Container>
                            {/* <SelectionStudentStops
                              studentsData={students}
                              stop={postion}
                              onSelectionChange={handleSelectionChange}
                            /> */}
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="choices-multiple-remove-button"
                                className="text-muted"
                              >
                                <strong> {postion?.type!} </strong>:{" "}
                                {postion?.type! === "Stop"
                                  ? postion?.details?.placeName!
                                  : postion?.details?.placeName!}
                              </Form.Label>
                              <Select
                                closeMenuOnSelect={false}
                                //defaultValue={selectedValues}
                                isMulti
                                options={options}
                                value={selectedValues}
                                styles={customStyles}
                                onChange={handleSelectValueChange}
                              />
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
export default StopsManagementOLD;
