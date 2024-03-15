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
  Dropdown,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
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
import { useAddProgrammMutation } from "features/programms/programmSlice";
import { number } from "yup";

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
  programName: string;
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

interface Stop {
  id: number;
  address: string;
}
interface RouteSegment {
  segment: number;
  startAddress: string;
  endAddress: string;
  distance: string;
  duration: string;
}
interface stopTime {
  hours: number;
  minutes: number;
}
const AddProgramm = (props: any) => {
  document.title = "Program | School Administration";
  const navigate = useNavigate();
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
  const [isOriginFirst, setIsOriginFirst] = useState(true);
  const [switched, setSwitched] = useState(false);

  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [programName, setProgramName] = useState("");
  const [capacityRecommanded, setCapacityRecommanded] = useState("");

  const [selected, setSelected] = useState<string[]>([]);
  const [selected1, setSelected1] = useState<string[]>([]);
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
  const [pickUp_time, setPickUp_time] = useState<Date>();
  const [dropOff_time, setDropOff_time] = useState<Date | null>(null);

  const [dropOff_date, setDropOff_date] = useState<Date | null>(null);
  const [free_date, setFree_date] = useState<Date[]>([]);

  const [pickUp_date, setPickUp_date] = useState<Date | null>(null);

  const [stops2, setStops2] = useState<Stop[]>([]);
  const [recap, setRecap] = useState<Recap>({
    programName: "",
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

  const [dropOff_test, setDropOff_test] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const [stops, setStops] = useState<google.maps.LatLng[]>([]);

  const [waypts, setWaypts] = useState<google.maps.DirectionsWaypoint[]>([]);

  const [stopTimes, setStopTimes] = useState<stopTime[]>([]);

  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);

  const [createProgram] = useAddProgrammMutation();
  const [programmData, setProgrammData] = useState({
    programName: "",
    origin_point: {
      placeName: "",
      coordinates: {
        lat: 1,
        lng: 1,
      },
    },
    stops: [
      {
        id: "",
        address: "",
        time: "",
      },
    ],
    destination_point: {
      placeName: "",
      coordinates: {
        lat: 1,
        lng: 1,
      },
    },
    pickUp_date: "",
    droppOff_date: "",
    freeDays_date: [""],
    exceptDays: [""],
    recommanded_capacity: "",
    extra: [""],
    notes: "",
  });
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Program created successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const onChangeProgramms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgrammData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitProgramm = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      programmData["extra"] = selected;
      programmData["exceptDays"] = selected1;
      programmData["freeDays_date"] = free_date.map((date) =>
        date.toISOString()
        // console.log(String(date.getFullYear)+)
      );
      programmData["droppOff_date"] = dropOff_date
        ? dropOff_date.toString()
        : "";
      programmData["pickUp_date"] = pickUp_date ? pickUp_date.toString() : "";
      const destinationPoint = destinationRef.current;

      if (
        destinationPoint &&
        destinationPoint.placeName &&
        destinationPoint.coordinates
      ) {
        programmData["destination_point"] = {
          placeName: destinationPoint.placeName,
          coordinates: destinationPoint.coordinates,
        };
      } else {
        console.error("destinationRef does not have the expected properties.");
      }

      const originPoint = originRef.current;

      if (originPoint && originPoint.placeName && originPoint.coordinates) {
        setProgrammData((prevData) => ({
          ...prevData,
          origin_point: {
            placeName: originPoint.placeName,
            coordinates: originPoint.coordinates,
          },
        }));
      } else {
        console.error("originPoint does not have the expected properties.");
      }

      let stops = [];

      for(let i = 0; i<waypts.length; i++){
        stops.push({
          id: "",
          address: String(waypts[i].location),
          time: String(stopTimes[i].hours).padStart(2, '0') + ':' + String(stopTimes[i].minutes).padStart(2, "0")
        });
      }

      programmData["stops"] = stops;

      // createProgram(programmData)
      //   .then(() => notify())
      //   .then(() => navigate(-1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddStopClick = (address: string) => {
    console.log("stops2", stops2);
    setStops2((prevStops) => [
      ...prevStops,
      { id: prevStops.length + 1, address },
    ]);
  };

  const handleRemoveStopClick = (idToRemove: any) => {
    setStops2((prevStops) => {
      console.log("handleRemoveStopClick called with ID:", idToRemove);
      const updatedStops = prevStops.filter((stop) => stop.id !== idToRemove);
      if(waypts.length !== 0){
        const tempWaypts = waypts;
        const newWaypts = tempWaypts.splice(stop.id - 1, 1);
        setWaypts(newWaypts);
        calculateRoute();
      }

      return updatedStops;
    });
  };

  const handleAddStopClickWrapper = (address: string) => {
    return () => handleAddStopClick(address);
  };
  const labels = "CDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (originRef.current && destinationRef.current) {
      setRecap((prevRecap) => ({
        ...prevRecap,
        programName,
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
    programName,
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
  var hours = String(
    Math.floor(
      (Number(test2!) / 60 +
        pickUp_time?.getMinutes()! +
        pickUp_time?.getHours()! * 60) /
        60
    )
  ).padStart(2, "0");

  var minutes = String(
    Math.round(
      (Number(test2!) / 60 +
        pickUp_time?.getMinutes()! +
        pickUp_time?.getHours()! * 60) %
        60
    )
  ).padStart(2, "0");
  console.log(hours + ":" + minutes);

  const handlePickupTime = (selectedDates: any) => {
    const formattedTime = selectedDates[0];
    // .toLocaleTimeString([], {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    setPickUp_time(formattedTime);
    console.log("Hello Fatma")
  };

  const handleStopTime = (selectedTime: any, index: number) => {
    console.log("indexx",index);
    const formattedTime = selectedTime[0];
    console.log(formattedTime);
    let hour = formattedTime?.getHours();
    let minute = formattedTime?.getMinutes();

    let tempStopTimes = stopTimes;
    tempStopTimes[index].hours = hour;
    tempStopTimes[index].minutes = minute;

    setStopTimes(tempStopTimes);
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
          <p> {programmData.programName}</p>
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
          <b>Capacity Recommended: </b>{" "}
          <p> {programmData.recommanded_capacity}</p>
          <b> Selected Options: </b> <p>{recap.selected.join(" ")}</p>
          <b> Except Days: </b> <p> {recap.selected1.join(" ")}</p>
        </Col>
      </Row>
    );
  };

  // const isJourneyStepValid = () => {
  //   return (
  //     journeyName.trim() !== "" &&
  //     originRef.current?.value.trim() !== "" &&
  //     destinationRef.current?.value.trim() !== ""
  //   );
  // };
  const isJourneyStepValid = () => {
    return (
      programmData.programName.trim() !== ""

      // originRef.current?.value.trim() !== "" &&
      // destinationRef.current?.value.trim() !== ""
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
    return programmData.recommanded_capacity.trim() !== "";
  };

  const isNextButtonDisabled = () => {
    switch (activeVerticalTab) {
      case 1:
        return !isJourneyStepValid();

      case 2:
        return (
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

  // function onPlaceChanged() {
  //   if (searchResult != null) {
  //     const place = (
  //       searchResult as unknown as google.maps.places.Autocomplete
  //     ).getPlace();
  //     console.log("place", place);
  //     const name = place.name;
  //     // setRecap((prevRecap) => ({
  //     //   ...prevRecap,
  //     //   originRef: name,
  //     // }));

  //     const location = place.geometry?.location;
  //     if (location) {
  //       const nom = { lat: location.lat(), lng: location.lng() };
  //       setNom(nom);
  //       const status = place.business_status;
  //       const formattedAddress = place.formatted_address;
  //       console.log(`Name: ${name}`);
  //       console.log(`Business Status: ${status}`);
  //       console.log(`Formatted Address: ${formattedAddress}`);
  //     } else {
  //       console.error("Location not found in place object");
  //     }
  //   } else {
  //     alert("Please enter text");
  //   }
  // }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = (
        searchResult as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        setRecap((prevRecap) => ({
          ...prevRecap,
          originRef: name,
        }));

        setProgrammData((prevData) => ({
          ...prevData,
          origin_point: {
            placeName: name,
            coordinates: coordinates,
          },
        }));

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

  // function onPlaceChangedDest() {
  //   if (searchDestination != null) {
  //     const place = (
  //       searchDestination as unknown as google.maps.places.Autocomplete
  //     ).getPlace();
  //     const name = place.name;
  //     setRecap((prevRecap) => ({
  //       ...prevRecap,
  //       destinationRef: name,
  //     }));

  //     const location = place.geometry?.location;
  //     setFatma(location);

  //     const status = place.business_status;
  //     const formattedAddress = place.formatted_address;
  //     console.log(`Name: ${name}`);
  //     console.log(`Business Status: ${status}`);
  //     console.log(`Formatted Address: ${formattedAddress}`);
  //   } else {
  //     alert("Please enter text");
  //   }
  // }

  function onPlaceChangedDest() {
    if (searchDestination != null) {
      const place = (
        searchDestination as unknown as google.maps.places.Autocomplete
      ).getPlace();
      const name = place.name;
      const location = place.geometry?.location;

      if (location) {
        const coordinates = { lat: location.lat(), lng: location.lng() };

        setRecap((prevRecap) => ({
          ...prevRecap,
          destinationRef: name,
        }));

        setProgrammData((prevData) => ({
          ...prevData,
          destination_point: {
            placeName: name,
            coordinates: coordinates,
          },
        }));

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

  // async function calculateRoute(): Promise<void> {
  //   setOriginSwitchRef(originRef?.current!.value);
  //   // console.log(originSwitchRef);
  //   setDestSwitchRef(destinationRef?.current!.value);
  //   // console.log(destSwitchRef);
  //   // console.log("waypoints", waypts);

  //   if (
  //     originRef?.current!.value === "" ||
  //     destinationRef?.current!.value === "" ||
  //     !map
  //   ) {
  //     console.error("Invalid inputs or map not loaded.");
  //     return;
  //   }

  //   setLoading(true);

  //   const directionsService = new google.maps.DirectionsService();

  //   directionsService.route(
  //     {
  //       origin: originRef.current.value,
  //       destination: destinationRef.current.value,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //       waypoints: waypts,
  //     },
  //     (result, status) => {
  //       setLoading(false);

  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirectionsResponse(result);
  //         setRouteDirections(result);

  //         const selectedRoute = result.routes.find((route) => {
  //           setTest(route.legs[0].distance.text.toString());
  //           setTest2(route.legs[0].duration.text.toString());

  //           // console.log("test", test);
  //           // console.log("originRef.current.value", originRef.current.value);
  //           // console.log(
  //           //   "route.legs[0].start_address",
  //           //   route.legs[0].start_address
  //           // );
  //           // console.log(
  //           //   "destinationRef.current.value",
  //           //   destinationRef.current.value
  //           // );
  //           // console.log("route.legs[0].end_address", route.legs[0].end_address);
  //         });

  //         if (!selectedRoute) {
  //           // console.log("distanceInMeters");
  //           return;
  //         }

  //         if (map && directionsResponse) {
  //           const directionsRenderer = new google.maps.DirectionsRenderer();
  //           directionsRenderer.setMap(map);
  //           directionsRenderer.setDirections(directionsResponse);
  //         }
  //       } else {
  //         console.error("Error fetching directions:", status);
  //       }
  //     }
  //   );
  // }

  async function calculateRoute(): Promise<void> {
    //stopTimes = [];
    setOriginSwitchRef(originRef?.current!.value);
    setDestSwitchRef(destinationRef?.current!.value);

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
            const segments = route.legs.map((leg, index) => ({
              segment: index + 1,
              startAddress: leg.start_address,
              endAddress: leg.end_address,
              distance: leg.distance.text,
              duration: leg.duration.text,
            }));
            setRouteSegments(segments);

            let durations = route.legs.map((leg, index) => ({
              duration: leg.duration.value,
            }));
            console.log("durations", durations);
            //durations.pop();
            const hours_first = Math.floor(durations[0].duration / 3600);
            const minutes_first = Math.floor(
              (durations[0].duration % 3600) / 60
            );

            let pickUpHour = String(pickUp_time?.getHours()).padStart(2, "0");
            let pickUpMinute = String(pickUp_time?.getMinutes()).padStart(
              2,
              "0"
            );

            const time_first = addDurationToTime(
              pickUpHour + ":" + pickUpMinute,
              hours_first,
              minutes_first
            );
            let temporarryTimes = [time_first];
            console.log("temporarryTimes", temporarryTimes);
            for (let i = 1; i < durations.length; i++) {
              const hours = Math.floor(durations[i].duration / 3600);
              const minutes = Math.floor((durations[i].duration % 3600) / 60);

              const time = addDurationToTime(
                String(temporarryTimes[i - 1]?.hours) +
                  ":" +
                  String(temporarryTimes[i - 1]?.minutes),
                hours,
                minutes
              );
              temporarryTimes.push(time);
            }

            const totalDurations = accumulateDurations(durations);
            
            const time_dest = addDurationToTime(
              pickUpHour + ":" + pickUpMinute,
              totalDurations.hours,
              totalDurations.minutes
            );
            temporarryTimes.push(time_dest);
            console.log(temporarryTimes);
            setStopTimes(temporarryTimes);
          });

          if (!selectedRoute) {
            return;
          }

          if (map && directionsResponse) {
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(directionsResponse);
          }
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }

  const createDateFromStrings = (YyyyMmDd: string, HhMmSs: string) => {
    //*var d1 = new Date('2020-03-10, 10:10:10'); //
    let date = new Date(YyyyMmDd + ", " + HhMmSs);
    return date;
  };
  async function switchRoute(): Promise<void> {
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
            setTest2(route.legs[0].duration.value.toString());
          });
          console.log(hours);
          let validHour = String(hours).padStart(2, "0");
          console.log(validHour);

          console.log(minutes);
          let validMinutes = String(minutes).padStart(2, "0");
          console.log(validMinutes);

          const date = new Date();
          const currentYear = date.getFullYear();
          console.log(currentYear);
          const currentMonth = date.getMonth() + 1;
          console.log(currentMonth);
          const currentDay = date.getDate().toLocaleString();
          console.log("currentDay", currentDay);

          if (!selectedRoute) {
            return;
          }
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }

  const addDurationToTime = (
    time: string,
    hoursToAdd: number,
    minutesToAdd: number
  ) => {
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes += hoursToAdd * 60 + minutesToAdd;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    // return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    //   2,
    //   "0"
    // )}`;

    return {
      hours: newHours,
      minutes: newMinutes,
    };
  };

  const accumulateDurations = (durations: any) => {
    console.log("Api durations",durations);
    let totalDuration = {
      hours:0,
      minutes:0,
    }
    for(let duration of durations) {
      const hours = Math.floor(
        duration.duration / 3600
      );
      const minutes = Math.floor(
        (duration.duration % 3600) / 60
      );
      totalDuration.hours += hours;
      totalDuration.minutes += minutes;
      console.log("Tempo Total",totalDuration);
    }

    let totalMinutes = (totalDuration.hours * 60) + totalDuration.minutes;

    let validHours = Math.floor(totalMinutes / 60) % 24;
    let valdMinutes = totalMinutes % 60;

    let total = {
      hours: validHours,
      minutes: valdMinutes
    }

    console.log("Total",total)

    return total;
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
                  <Form
                    className="vertical-navs-step"
                    onSubmit={onSubmitProgramm}
                  >
                    <Tab.Container activeKey={activeVerticalTab}>
                      <Tab.Content>
                        <Tab.Pane eventKey="1">
                          <Row>
                            <Col lg={4} >
                              <div  style={{ maxHeight: 'calc(80vh - 80px)', overflowX: 'auto' }}>
                              <Form.Label htmlFor="programName">
                                Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="programName"
                                style={{ width: "400px" }}
                                required
                                className="mb-2"
                                placeholder="Add Program Name"
                                name="programName"
                                value={programmData.programName}
                                onChange={onChangeProgramms}
                              />
                              <Form.Label htmlFor="customerName-field">
                                coordinations
                              </Form.Label>

                              <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                  From
                                </InputGroup.Text>
                                <div className="d-flex">
                                  <Autocomplete
                                    onPlaceChanged={onPlaceChanged}
                                    onLoad={onLoad}
                                  >
                                    <Form.Control
                                      type="text"
                                      style={{ width: "250px" }}
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
                                      onChange={onChangeProgramms}
                                    />
                                  </Autocomplete>
                                  <Flatpickr
                                    className="form-control"
                                    id="pickUp_time"
                                    style={{ width: "100px" }}
                                    options={{
                                      enableTime: true,

                                      noCalendar: true,
                                      dateFormat: "H:i",
                                      time_24hr: true,
                                      onChange: handlePickupTime,
                                    }}
                                  />
                                </div>
                                {/* <p>{pickUp_time?.toDateString()}</p> */}
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
                                    onChange={onChangeProgramms}
                                  />
                                </Autocomplete>
                                <Flatpickr
                                  className="form-control"
                                  id="pickUp_time"
                                  style={{ width: "100px" }}
                                  value={createDateFromStrings(
                                    String(new Date().getFullYear()).padStart(
                                      2,
                                      "0"
                                    ) +
                                      "-" +
                                      String(
                                        new Date().getMonth() + 1
                                      ).padStart(2, "0") +
                                      "-" +
                                      String(
                                        new Date().getDate().toLocaleString()
                                      ).padStart(2, "0"),
                                    stopTimes[stopTimes.length - 1]?.hours +
                                      ":" +
                                      stopTimes[stopTimes.length - 1]?.minutes +
                                      ":00"
                                  ).getTime()}
                                  options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                  }}
                                />
                              </InputGroup>

                              <div className="flex">
                                <Button
                                  onClick={switchRoute}
                                  className="btn btn-dark w-lg d-grid gap-2 btn-switch"
                                >
                                  Switch
                                </Button>
                              </div>

                              {/* <Flatpickr
                                  className="form-control"
                                  id="dropOff_time"
                                  options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                   
                                  }}
                                /> */}

                              <div style={{ marginTop: "20px" }}>
                                {stops2.map((stop, index) => (
                                  <Row>
                                    <Col lg={6} key={index}>
                                      <Form.Label htmlFor="customerName-field">
                                        Stop {index + 1}
                                      </Form.Label>
                                      <div className="mb-3 d-flex">
                                        <Autocomplete
                                          onPlaceChanged={onPlaceChangedStop}
                                          onLoad={onLoadStop}
                                        >
                                          <Form.Control
                                            type="text"
                                            style={{ width: "250px" }}
                                            placeholder="Stop"
                                            ref={stopRef}
                                            id="stop"
                                            onClick={() => {
                                              handleLocationButtonClickStop();
                                            }}
                                          />
                                        </Autocomplete>
                                        {
                                          <Flatpickr
                                            className="form-control"
                                          
                                            style={{ width: "100px" }}
                                            id="pickUp_time"
                                            value={createDateFromStrings(
                                              String(
                                                new Date().getFullYear()
                                              ).padStart(2, "0") +
                                                "-" +
                                                String(
                                                  new Date().getMonth() + 1
                                                ).padStart(2, "0") +
                                                "-" +
                                                String(
                                                  new Date()
                                                    .getDate()
                                                    .toLocaleString()
                                                ).padStart(2, "0"),
                                              stopTimes[index]?.hours +
                                                ":" +
                                                stopTimes[index]?.minutes +
                                                ":00"
                                            ).getTime()}
                                            options={{
                                              enableTime: true,
                                              noCalendar: true,
                                              dateFormat: "H:i",
                                              time_24hr: true,
                                            }}
                                            onChange={(selectedDates) => handleStopTime(selectedDates, index)}
                                          />
                                        }
                                      </div>
                                    </Col>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-icon"
                                      onClick={() =>
                                        handleRemoveStopClick(stop.id)
                                      }
                                      style={{
                                        marginTop: "29px",
                                        marginLeft: "80px",
                                      }}
                                    >
                                      <i className="ri-delete-bin-5-line"></i>
                                    </button>
                                  </Row>
                                ))}
                                <Link
                                  to="#"
                                  id="add-item"
                                  className="btn btn-soft-secondary fw-medium"
                                  onClick={handleAddStopClickWrapper(
                                    "New Stop Address"
                                  )}
                                >
                                  <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2">
                                    {" "}
                                    Via
                                  </i>
                                </Link>
                                <Link
                                  to="#"
                                  id="add-item"
                                  className="btn btn-soft-secondary fw-medium link"
                                >
                                  <i className="ri-add-line label-icon align-middle rounded-pill fs-16 me-2">
                                    {" "}
                                    Options
                                  </i>
                                </Link>
                              </div>
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

                              {/* <div>
                                {test && test2 && (
                                  <div className="distance">
                                    <Form.Label className="label">
                                      Distance:{test}
                                    </Form.Label>
                                    <Form.Label className="label">
                                      Duration: {test2}
                                    </Form.Label>
                                  </div>
                                )}
                              </div> */}
                              </div>
                            </Col>

                            <Col lg={8}>
                              <div
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  height: "530px",
                                  width: "2315px",
                                }}
                              >
                                <GoogleMap
                                  center={center}
                                  zoom={15}
                                  mapContainerStyle={{
                                    width: isMapFullScreen ? "100vw" : "43%",
                                    height: isMapFullScreen ? "100vh" : "120%",
                                  }}
                                  options={{
                                    zoomControl: false,
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                    fullscreenControl: true,

                                    fullscreenControlOptions: {
                                      position:
                                        google.maps.ControlPosition.TOP_RIGHT,
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
                              <div
                                className="d-flex align-items-end"
                                style={{ marginTop: "650px" }}
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

                                <Dropdown style={{ marginLeft: "100px" }}>
                                  <Dropdown.Toggle
                                    variant="secondary"
                                    id="dropdown-basic"
                                  >
                                    Route Information
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {routeSegments.map((segment, index) => (
                                      <Dropdown.Item key={index}>
                                        <div>
                                          <p>
                                            Route Segment: {segment.segment}
                                          </p>
                                          <p>
                                            {segment.startAddress} To{" "}
                                            {segment.endAddress}
                                          </p>
                                          <p>{segment.distance}</p>
                                          <p>{segment.duration}</p>
                                        </div>
                                      </Dropdown.Item>
                                    ))}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Col>
                          </Row>
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
                                  // onChange: handlePickupTime,
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
                                  // onChange: handleDroppOffTime,
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
                                  Slide the selected excepted days to the right
                                </p>
                                <DualListBox
                                  options={options1}
                                  selected={selected1}
                                  onChange={(e: any) =>{
                                    console.log("event",e)
                                    setSelected1(e)}}
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
                                <Form.Label htmlFor="recommanded_capacity">
                                  Recommanded Capacity
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="recommanded_capacity"
                                  required
                                  className="mb-2"
                                  name="recommanded_capacity"
                                  value={programmData.recommanded_capacity}
                                  onChange={onChangeProgramms}
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

                          <Button
                            variant="success"
                            type="submit"
                            className="w-sm"
                          >
                            Submit
                          </Button>
                        </Tab.Pane>
                      </Tab.Content>
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
