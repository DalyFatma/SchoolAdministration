import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Tab,
  Button,
  InputGroup,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
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
  originRef: string;
  destinationRef: string;
  dropOff_date: string;
  dropOff_time: string;
  free_date: string[];
  pickUp_date: string;
  pickUp_time: string;
}

const AddProgramm = (props: any) => {
  document.title = "Program | School Administration";
  const [showAddStations, setShowAddStations] = useState<boolean>(false);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [forceRender, setForceRender] = useState(false);
  const [pathCoordinates, setPathCoordinates] = useState<google.maps.LatLng[]>(
    []
  );
  const [clickedMarker, setClickedMarker] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");

  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [journeyName, setJourneyName] = useState("");
  const [capacityRecommanded, setCapacityRecommanded] = useState("");

  const [selected, setSelected] = useState([""]);
  const [selected1, setSelected1] = useState([""]);
  // const [stops, setStops] = useState([{ id: 1 }]);
  const [searchResult, setSearchResult] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [searchStop, setSearchStop] = useState("");
  const [fatma, setFatma] = useState<any>();
  const [stop, setStop] = useState<any>();
  const [nom, setNom] = useState<any>();
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [clickedMarkers, setClickedMarkers] = useState<number[]>([]);

  const [routeDirections, setRouteDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [stopNames, setStopNames] = useState<string[]>([]);

  const [isMapFullScreen, setIsMapFullScreen] = useState(false);

  const originRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);
  const stopRef = useRef<any>(null);

  const [destSwitchRef, setDestSwitchRef] = useState<google.maps.LatLng[]>([]);
  const [originSwitchRef, setOriginSwitchRef] = useState<google.maps.LatLng[]>(
    []
  );
  const [pickUp_time, setPickUp_time] = useState<Date | null>(null);
  const [dropOff_time, setDropOff_time] = useState<Date | null>(null);

  const [dropOff_date, setDropOff_date] = useState<Date | null>(null);
  const [free_date, setFree_date] = useState<Date[]>([]);

  const [pickUp_date, setPickUp_date] = useState<Date | null>(null);

  const [isOriginFirst, setIsOriginFirst] = useState(true);

  const [switched, setSwitched] = useState(false);

  const [stops2, setStops2] = useState([{ id: 1 }]);

  const [recap, setRecap] = useState<Recap>({
    journeyName: "",
    capacityRecommanded: "",
    selected: [],
    selected1: [],
    stops: [],
    originRef: "",
    destinationRef: "",
    dropOff_date: "",
    dropOff_time: "",
    free_date: [],
    pickUp_date: "",
    pickUp_time: "",
  });

  const [test, setTest] = useState("");
  const [test2, setTest2] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const [stops, setStops] = useState<google.maps.LatLng[]>([]);

  const [waypts, setWaypts] = useState<google.maps.DirectionsWaypoint[]>([]);

  const handleAddStopClick = () => {
    console.log(stop);
    setStops2((prevStop) => [...prevStop, { id: prevStop.length + 1 }]);
  };

  const handleRemoveStopClick = (idToRemove: any) => {
    setStops2((prevStop) => prevStop.filter((stop) => stop.id !== idToRemove));
  };

  const labels = "CDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (originRef.current && destinationRef.current) {
      setRecap((prevRecap) => ({
        ...prevRecap,
        journeyName,
        capacityRecommanded,
        selected,
        selected1,
        stops,
        originRef: originRef.current.value,
        destinationRef: destinationRef.current.value,
        dropOff_date: dropOff_date ? dropOff_date.toString() : "",
        dropOff_time: dropOff_time ? dropOff_time.toString() : "",
        free_date:
          free_date.length > 0 ? free_date.map((date) => date.toString()) : [],
        pickUp_date: pickUp_date ? pickUp_date.toString() : "",
        pickUp_time: pickUp_time ? pickUp_time.toString() : "",
      }));
    }
  }, [
    journeyName,
    capacityRecommanded,
    selected,
    selected1,
    stops,
    originRef,
    destinationRef,
    dropOff_date,
    dropOff_time,
    free_date,
    pickUp_date,
    pickUp_time,
  ]);

  // useEffect(() => {
  //   const fetchLocationNames = async () => {
  //     const names: string[] = [];
  //     const geocoder = new google.maps.Geocoder();

  //     for (const stop of recap.stops) {
  //       await new Promise<void>((resolve) => {
  //         geocoder.geocode(
  //           { location: stop },
  //           (
  //             results: google.maps.GeocoderResult[],
  //             status: google.maps.GeocoderStatus
  //           ) => {
  //             if (status === google.maps.GeocoderStatus.OK) {
  //               if (results[0]) {
  //                 names.push(results[0].formatted_address);
  //               }
  //             }
  //             resolve();
  //           }
  //         );
  //       });
  //     }
  //     setStopNames(names);
  //   };

  //   if (recap.stops.length > 0) {
  //     fetchLocationNames();
  //   }
  // }, [recap.stops]);

  // useEffect(() => {
  //   console.log("Recap state:", recap);
  // }, [recap]);

  const handlePickupTime = (selectedDates: any) => {
    const formattedTime = selectedDates[0].toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setPickUp_time(formattedTime);
  };
  const handleDroppOffTime = (selectedDates: any) => {
    const formattedTime = selectedDates[0].toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDropOff_time(formattedTime);
  };

  const handleDateChange1 = (selectedDates: Date[]) => {
    setPickUp_date(selectedDates[0]);
  };
  const handleDateChange2 = (selectedDates: Date[]) => {
    setDropOff_date(selectedDates[0]);
  };

  const handleDateChange3 = (selectedDates: Date[]) => {
    setFree_date(selectedDates);
  };

  const getWorkDates = () => {
    let workDates = [];

    let startDate = pickUp_date;
    let endDate = dropOff_date;

    if (startDate && endDate && endDate >= startDate) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        if (
          !free_date.find(
            (freeDay) => freeDay.toDateString() === currentDate.toDateString()
          )
        ) {
          if (
            !selected1.includes(
              currentDate.toLocaleString("en-us", { weekday: "long" })
            )
          ) {
            workDates.push(new Date(currentDate));
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    // console.log("workDates", workDates);
    return workDates;
  };

  const renderRecapPage = () => {
    return (
      <Row className="d-flex justify-content-space-between">
        <Col>
          <b> Journey Name: </b>
          <p> {recap.journeyName}</p>
          <b>Origin Location Name: </b>
          <p>{recap.originRef}</p>
          <b> Destination Location Name: </b>
          <p> {recap.destinationRef}</p>
          <b>List of stops Locations Name:</b>
          <ul>
            {stopNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <b>PickUp Time: </b> <p> {recap.pickUp_time}</p>
          <b>DropOff Time: </b> <p> {recap.dropOff_time}</p>
          <b>Start Date: </b>
          <p>
            {new Date(recap.pickUp_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <b>End Date: </b>
          <p>
            {new Date(recap.dropOff_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </Col>
        <Col>
          <b>Free Dates: </b>
          <ul>
            {Array.isArray(recap.free_date) &&
              recap.free_date.map((dateString, index) => (
                <li key={index}>
                  {new Date(dateString).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </li>
              ))}
          </ul>
          <b>Work Dates: </b>
          <ul>
            {getWorkDates().map((date: any, index: any) => (
              <li key={index}>
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </li>
            ))}
          </ul>
          <b>Capacity Recommended: </b> <p> {recap.capacityRecommanded}</p>
          <b> Selected Options: </b> <p>{recap.selected.join(" ")}</p>
          <b> Except Days: </b> <p> {recap.selected1.join(" ")}</p>
        </Col>
      </Row>
    );
  };

  const isJourneyStepValid = () => {
    return (
      journeyName.trim() !== "" &&
      originRef.current?.value.trim() !== "" &&
      destinationRef.current?.value.trim() !== ""
    );
  };

  const isTripTimesStepValid = () => {
    const pickupTimeInput = document.getElementById(
      "pickUp_time"
    ) as HTMLInputElement | null;
    const dropoffTimeInput = document.getElementById(
      "dropOff_time"
    ) as HTMLInputElement | null;
    const pickupTime = pickupTimeInput?.value ?? "";
    const dropoffTime = dropoffTimeInput?.value ?? "";

    return pickupTime.trim() !== "" && dropoffTime.trim() !== "";
  };

  const isRunDatesStepValid = () => {
    const startDateInput = document.getElementById(
      "pickUp_date"
    ) as HTMLInputElement | null;
    const endDateInput = document.getElementById(
      "dropOff_date"
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
      "free_date"
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
        return (
          !isTripTimesStepValid() ||
          !isRunDatesStepValid() ||
          !isOptionsStepValid() ||
          !isFreeDaysStepValid()
        );
      case 3:
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

  function onLoadStop(autocomplete: any) {
    setSearchStop(autocomplete);
  }

  function onLoadDest(autocomplete: any) {
    setSearchDestination(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      console.log("place", place);
      const name = place.name;
      // setRecap((prevRecap) => ({
      //   ...prevRecap,
      //   originRef: name,
      // }));

      const location = place.geometry?.location;
      if (location) {
        const nom = { lat: location.lat(), lng: location.lng() };
        setNom(nom);
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
        console.log(`Name: ${name}`);
        console.log(`Business Status: ${status}`);
        console.log(`Formatted Address: ${formattedAddress}`);
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceChangedStop() {
    if (searchStop != null) {
      const place = (
        searchStop as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      console.log("place", place);
      const location = place.geometry?.location;
      if (location) {
        const nom = { lat: location.lat(), lng: location.lng() };
        setStop(nom);
        // setRecap((prevRecap) => ({
        //   ...prevRecap,
        //   stopRef: name,
        // }));
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
        const wayPoint = {
          location: formattedAddress,
          stopover: true,
        };
        setWaypts((waypts) => [...waypts, wayPoint]);
        console.log(`Name: ${name}`);
        console.log(`Business Status: ${status}`);
        console.log(`Formatted Address: ${formattedAddress}`);
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      setRecap((prevRecap) => ({
        ...prevRecap,
        destinationRef: name,
      }));

      const location = place.geometry?.location;
      setFatma(location);

      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  // function onPlaceChangedOrigin() {
  //   if (searchResult != null) {
  //     const place = searchResult as google.maps.places.PlaceResult;
  //     const name = place.name;
  //     setOriginLocation(name);
  //   }
  // }

  // function onPlaceChangedDestination() {
  //   if (searchDestination != null) {
  //     const place = searchDestination as google.maps.places.PlaceResult;
  //     const name = place.name;
  //     setDestinationLocation(name);
  //   }
  // }

  const handleLocationButtonClick = () => {
    setSelectedLocation(nom);
  };
  const handleLocationButtonClickStop = () => {
    setSelectedStop(stop);
  };

  const handleLocationButtonClickDest = () => {
    setSelectedDestination(fatma);
  };

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
    const tolerance = 20;
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
  const switchLocations = () => {
    setIsOriginFirst(!isOriginFirst);
  };

  const toggleSwitch = () => {
    console.log("Switch button clicked");
    setSwitched(!switched);
  };

  async function calculateRoute(): Promise<void> {
    setOriginSwitchRef(originRef?.current!.value);
    console.log(originSwitchRef);
    setDestSwitchRef(destinationRef?.current!.value);
    console.log(destSwitchRef);
    console.log("waypoints", waypts);
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
        waypoints: waypts,
      },
      (result, status) => {
        setLoading(false);

        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRouteDirections(result);

          const selectedRoute = result.routes.find((route) => {
            setTest(route.legs[0].distance.text.toString());
            setTest2(route.legs[0].duration.text.toString());

            console.log("test", test);
            console.log("originRef.current.value", originRef.current.value);
            console.log(
              "route.legs[0].start_address",
              route.legs[0].start_address
            );
            console.log(
              "destinationRef.current.value",
              destinationRef.current.value
            );
            console.log("route.legs[0].end_address", route.legs[0].end_address);
          });

          if (!selectedRoute) {
            console.log("distanceInMeters");
            return;
          }

          const distanceInMeters = selectedRoute.legs[0].distance.value;
          const durationInSeconds = selectedRoute.legs[0].duration.value;

          console.log("distanceInMeters", distanceInMeters);
          console.log("durationInSeconds", durationInSeconds);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }

  async function switchRoute(): Promise<void> {
    console.log("waypoints", waypts);
    // if (
    //   originSwitchRef?.current!.value === "" ||
    //   destSwitchRef?.current!.value === "" ||
    //   !map
    // ) {
    //   console.error("Invalid inputs or map not loaded.");
    //   return;
    // }

    setLoading(true);

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: destinationRef.current.value,
        destination: originRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypts.reverse(),
      },
      (result, status) => {
        setLoading(false);

        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRouteDirections(result);

          const selectedRoute = result.routes.find((route) => {
            setTest(route.legs[0].distance.text.toString());
            setTest2(route.legs[0].duration.text.toString());

            console.log("test", test);
            console.log("originRef.current.value", originRef.current.value);
            console.log(
              "route.legs[0].start_address",
              route.legs[0].start_address
            );
            console.log(
              "destinationRef.current.value",
              destinationRef.current.value
            );
            console.log("route.legs[0].end_address", route.legs[0].end_address);
          });

          if (!selectedRoute) {
            console.log("distanceInMeters");
            return;
          }

          const distanceInMeters = selectedRoute.legs[0].distance.value;
          const durationInSeconds = selectedRoute.legs[0].duration.value;

          console.log("distanceInMeters", distanceInMeters);
          console.log("durationInSeconds", durationInSeconds);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
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
                <Card.Body className="form-steps" style={{ height: "80vh" }}>
                  <Form className="vertical-navs-step">
                    <Tab.Container activeKey={activeVerticalTab}>
                      <Row className="gy-5">
                        <Col lg={10}>
                          <div className="px-lg-4">
                            <Tab.Content>
                              <Tab.Pane eventKey="1">
                                <Container>
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
                                      <Form.Label htmlFor="customerName-field">
                                        coordinations
                                      </Form.Label>

                                      <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">
                                          From
                                        </InputGroup.Text>

                                        <Autocomplete
                                          onPlaceChanged={onPlaceChanged}
                                          onLoad={onLoad}
                                        >
                                          <Form.Control
                                            type="text"
                                            style={{ width: "285px" }}
                                            placeholder="Origin"
                                            ref={originRef}
                                            id="origin"
                                            onClick={() => {
                                              handleLocationButtonClick();
                                              if (nom) {
                                                map?.panTo(nom);
                                                map?.setZoom(15);
                                              }
                                            }}
                                          />
                                        </Autocomplete>
                                      </InputGroup>
                                      <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">
                                          To
                                        </InputGroup.Text>

                                        <Autocomplete
                                          onPlaceChanged={onPlaceChangedDest}
                                          onLoad={onLoadDest}
                                        >
                                          <Form.Control
                                            type="text"
                                            style={{ width: "300px" }}
                                            placeholder="Destination"
                                            ref={destinationRef}
                                            id="dest"
                                            onClick={() => {
                                              handleLocationButtonClickDest();
                                              if (fatma) {
                                                map?.panTo(fatma);
                                                map?.setZoom(15);
                                              }
                                            }}
                                          />
                                        </Autocomplete>
                                      </InputGroup>

                                      <div className="flex">
                                        <Button
                                          onClick={switchRoute}
                                          className="btn btn-success w-lg custom-button d-grid gap-2"
                                        >
                                          Switch
                                        </Button>

                                        {loading ? (
                                          <p>Calculating route...</p>
                                        ) : (
                                          <Button
                                            type="submit"
                                            onClick={calculateRoute}
                                            className="custom-button"
                                          >
                                            Plan Route
                                          </Button>
                                        )}
                                      </div>

                                      <div style={{ marginTop: "20px" }}>
                                        {stops2.map((stop, index) => (
                                          <Row>
                                            <Col lg={6} key={index}>
                                              <div className="mb-3">
                                                <Form.Label htmlFor="customerName-field">
                                                  Stop {index + 1}
                                                </Form.Label>
                                                <Autocomplete
                                                  onPlaceChanged={
                                                    onPlaceChangedStop
                                                  }
                                                  onLoad={onLoadStop}
                                                >
                                                  <Form.Control
                                                    type="text"
                                                    style={{ width: "300px" }}
                                                    placeholder="Stop"
                                                    ref={stopRef}
                                                    id="stop"
                                                    onClick={() => {
                                                      handleLocationButtonClickStop();
                                                    }}
                                                  />
                                                </Autocomplete>
                                              </div>
                                            </Col>
                                            {/* <Col lg={3}>
                                              <button
                                                type="button"
                                                className="btn btn-danger btn-icon"
                                                onClick={() =>
                                                  handleRemoveStopClick(stop.id)
                                                }
                                                style={{ marginTop: "25px" }}
                                              >
                                                <i className="ri-delete-bin-5-line"></i>
                                              </button>
                                            </Col> */}
                                          </Row>
                                        ))}
                                        <Link
                                          to="#"
                                          id="add-item"
                                          className="btn btn-soft-secondary fw-medium"
                                          onClick={handleAddStopClick}
                                        >
                                          <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2">
                                            {" "}
                                            Via
                                          </i>
                                        </Link>
                                      </div>
                                    </Col>

                                    <Col lg={8}>
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0",
                                          height: "130%",
                                          width: "330%",
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
                                    </Col>
                                  </Row>
                                </Container>
                                <div
                                  className="d-flex align-items-end"
                                  style={{ marginTop: "250px" }}
                                >
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab "
                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Set Run dates
                                  </Button>
                                </div>
                              </Tab.Pane>

                              <Tab.Pane eventKey="2">
                                <Row>
                                  <div className="mt-2">
                                    <h5>Trip Times</h5>
                                  </div>
                                  <Col lg={5}>
                                    <InputGroup>PickUp Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      id="pickUp_time"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                        onChange: handlePickupTime,
                                      }}
                                    />
                                  </Col>

                                  <Col className="d-flex justify-content-center align-items-center"></Col>
                                  <Col lg={5}>
                                    <InputGroup>DropOff Time</InputGroup>
                                    <Flatpickr
                                      className="form-control"
                                      id="dropOff_time"
                                      options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                        onChange: handleDroppOffTime,
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
                                        value={pickUp_date!}
                                        onChange={handleDateChange1}
                                        className="form-control flatpickr-input"
                                        id="pickUp_date"
                                        placeholder="Select Date"
                                        options={{
                                          dateFormat: "d M, Y",
                                          onChange: (selectedDates: Date[]) => {
                                            setPickUp_date(selectedDates[0]);
                                          },
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
                                      value={dropOff_date!}
                                      onChange={handleDateChange2}
                                      className="form-control flatpickr-input"
                                      id="dropOff_date"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                        onChange: (selectedDates: Date[]) => {
                                          setDropOff_date(selectedDates[0]);
                                        },
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
                                      value={free_date!}
                                      onChange={handleDateChange3}
                                      className="form-control flatpickr-input"
                                      id="free_date"
                                      placeholder="Select Date"
                                      options={{
                                        dateFormat: "d M, Y",
                                        mode: "multiple",
                                        onChange: (selectedDates: Date[]) => {
                                          setFree_date(selectedDates);
                                        },
                                      }}
                                    />
                                  </Col>
                                </Row>
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
                                    onClick={() => setactiveVerticalTab(1)}
                                  >
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                    Back to Journey
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                    onClick={handleNextStep}
                                    disabled={isNextButtonDisabled()}
                                  >
                                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                    Add Options
                                  </Button>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="3">
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
                                    onClick={() => setactiveVerticalTab(2)}
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
                              <Tab.Pane eventKey="4">
                                {renderRecapPage()}

                                <Button
                                  type="button"
                                  className="btn btn-light btn-label previestab"
                                  onClick={() => setactiveVerticalTab(3)}
                                >
                                  <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                  Back to Options
                                </Button>
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
