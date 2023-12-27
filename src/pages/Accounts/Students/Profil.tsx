import React from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  Circle,
  User,
  Calendar,
  Phone,
  Clock,
  Clipboard,
  Airplane,
  Envelope,
  MapPin,
  HourglassMedium,
  GraduationCap,
  NumberCircleEight,
  NumberSquareOne,
  Check,
  Users,
  GenderFemale,
  GenderMale,
  GenderNonbinary,
  GlobeHemisphereWest,
} from "phosphor-react";

// Import Images
import img1 from "assets/images/users/avatar-1.jpg";
import { NumberSchema } from "yup";

const Profile = (props: any) => {
  const {
    date_birth,
    last_name,
    mobile2,
    original_nationality,
    nationality,
    gender,
    first_name,
    dropdown_time,
    mid_stations,
    adressMail,
    mobile,
    group,
    dropdown_station,
    user_img,
    pickup_station,
    pickup_time,
    status,
  } = props;
  console.log(props);
  return (
    <React.Fragment>
      <Card.Body>
        <Row>
          <Col lg={3}>
            <div className="profile-user-img position-relative">
              <img
                src={user_img}
                alt=""
                className="rounded object-fit-cover"
                style={{
                  width: "70%",
                  height: "80%",
                  marginLeft: "55px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Col>
          <Col lg={9}>
            <div className="d-flex border-bottom border-bottom-dashed pb-3 mb-10 mt-100 mt-lg-4">
              <div className="flex-grow-5">
                <h4>Student's Informations</h4>
              </div>
            </div>

            <div className="mt-0 ml-0">
              <Col lg={6}>
                <div className="table-responsive">
                  <Table className=" mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">
                          <User /> Full Name
                        </td>
                        <td className="fw-medium">
                          {first_name} {last_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">
                          {gender === "Male" ? (
                            <GenderMale />
                          ) : gender === "Female" ? (
                            <GenderFemale />
                          ) : (
                            <GenderNonbinary />
                          )}{" "}
                          Gender
                        </td>
                        <td className="fw-medium">{gender}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold ">
                          <Circle /> Account Status
                        </td>
                        <td
                          className={`value ${
                            status === "Active" ? "text-success" : "text-danger"
                          }`}
                        >
                          {status.toUpperCase()}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">
                          <Calendar /> Date of Birth
                        </td>
                        <td className="fw-medium">{date_birth}</td>
                      </tr>
                      {/* <tr>
                        <td className="fw-bold">
                        <GlobeHemisphereWest /> Nationality
                        </td>
                        <td className="fw-medium">{nationality}</td>
                      </tr> */}
                      {/* <tr>
                        <td className="fw-bold">
                        <GlobeHemisphereWest /> Original Nationality
                        </td>
                        <td className="fw-medium">{original_nationality}</td>
                      </tr>*/}
                      <tr> 
                        <td className="fw-bold">
                          <Phone /> Mobile/ Phoen No
                        </td>
                        <td className="fw-medium">{mobile}</td>
                      </tr>
                      {/* <tr>
                        <td className="fw-bold">
                          <Phone /> Mobile 2
                        </td>
                        <td className="fw-medium">{mobile2}</td>
                      </tr> */}
                      <tr>
                        <td className="fw-bold">
                          <Envelope /> Address Email
                        </td>
                        <td className="fw-medium">{adressMail}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-evenly"
          style={{ marginTop: "40px" }}
        >
          <Col lg={6}>
            <div className="table-responsive">
              <Table className=" mb-0">
                <tbody>
                  <tr>
                    <td className="fw-bold">
                      {" "}
                      <MapPin /> PickUp Station
                    </td>
                    <td className="fw-medium">{pickup_station}</td>
                  </tr>

                  <tr>
                    <td className="fw-bold">
                      {" "}
                      <Clock /> PickUp Time
                    </td>
                    <td className="fw-medium">{pickup_time}</td>
                  </tr>

                  <tr>
                    <td className="fw-bold">
                      <MapPin /> Drop-Off Station
                    </td>
                    <td className="fw-medium">{mid_stations}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <Clock />
                      Drop-Off Time
                    </td>
                    <td className="fw-medium">{dropdown_time}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      {" "}
                      <MapPin /> Mid Stations
                    </td>
                    <td className="fw-medium">{dropdown_station}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={6}>
            <div className="table-responsive g-3">
              <Table className=" mb-0">
                <tbody>
                  <tr>
                    <td className="fw-bold">
                      {" "}
                      <GraduationCap /> Class
                    </td>
                    <td className="fw-medium">Chemsitry Class</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      {" "}
                      <Check /> Total Trips
                    </td>
                    <td className="fw-medium">237</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <Calendar /> Joining Date
                    </td>
                    <td className="fw-medium">3,412</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      <Users /> Group Trip
                    </td>
                    <td className="fw-medium">{group}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </React.Fragment>
  );
};

export default Profile;
