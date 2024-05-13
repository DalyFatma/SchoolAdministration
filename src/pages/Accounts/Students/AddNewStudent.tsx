import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleBar from "simplebar-react";
// Import Contry Data
import country from "Common/country";
import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";
import { useAddStudentMutation } from "features/student/studentSlice";
import Swal from "sweetalert2";
// import { useAppDispatch } from "slices/hook";
const AddNewStudent = () => {
  document.title = "Create Account | Affiliate Administration";

  // const [selectedFiles, setselectedFiles] = useState([]);
  // const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  // Country Change States
  const [seletedCountry, setseletedCountry] = useState<any>({});
  const [seletedCountry1, setseletedCountry1] = useState<any>({});
  const [parents, setParents] = useState([{ id: 1 }]);
  const [selectedImage, setSelectedImage] = useState(dummyImg);
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [selectedOption4, setSelectedOption4] = useState<string>("");
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(null);
  const [selectedDate4, setSelectedDate4] = useState<Date | null>(null);
  const [selectedPickupTime, setSelectedPickupTime] = useState<Date | null>(
    null
  );
  const [selectedDropOffTime, setSelectedDropOffTime] = useState<Date | null>(
    null
  );
  const [selectedFiles, setselectedFiles] = useState([]);
  // const [pickupTime, setPickupTime] = useState(null);
  // const [dropOffTime, setDropOffTime] = useState(null);

  /* Formats the size */

  // Mutation to create student
  const [createStudent] = useAddStudentMutation();

  const [formData, setFormData] = useState({
    idstudent: "",
    firstName: "",
    lastName: "",
    dateBirth: "",
    login: "",
    password: "",
    email: "",
    phone: "",
    classStudent: "",
    houseStreerNumber: "",
    deparment: "",
    country: "",
    card_id: "",
    nameParent: "",
    status_account: "",
    id_creation_date: "",
    id_file: "",
    IdFileExtension: "",
    IdFileBase64String: "",
    DropOff_date: "",
    DropOff_time: "",
    DropOff_station: "",
    pickUp_date: "",
    pickUp_time: "",
    pickUp_station: "",
    group: "",
    photo_id: "",
    PhotoIdBase64String: "",
    PhotoIdExtension: "",
    idSchool: "",
    groupId: "",
    groupJoiningDate: "",
  });

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitStudent = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      formData["dateBirth"] = selectedDate1!.toISOString();
      // formData["pickUp_date"] = selectedDate2!.toISOString();
      // formData["pickUp_date"] = selectedDate3!.toISOString();
      // formData["DropOff_date"] = selectedDate4!.toISOString();
      formData["status_account"] = selectedOption1;
      // formData["group"] = selectedOption2;
      // formData["pickUp_station"] = selectedOption3;
      // formData["DropOff_station"] = selectedOption4;
      // formData["pickUp_time"] = selectedPickupTime!.toISOString() ?? null;
      // formData["DropOff_time"] = selectedDropOffTime!.toISOString() ?? null;

      createStudent(formData).then(() => setFormData(formData));
      notify();
      navigate("/students");
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Student created successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const error = (error: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Creation Student failed ${error}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  function convertToBase64(
    file: File
  ): Promise<{ base64Data: string; extension: string }> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        // const base64Data = base64String.split(",")[1]; // Extract only the Base64 data
        const [, base64Data] = base64String.split(","); // Extract only the Base64 data
        const extension = file.name.split(".").pop() ?? ""; // Get the file extension
        resolve({ base64Data, extension });
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("IdFileBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      console.log(base64Data);
      console.log(extension);
      const newFile = base64Data + "." + extension;
      console.log(newFile);
      setFormData({
        ...formData,
        id_file: newFile,
        IdFileBase64String: base64Data,
        IdFileExtension: extension,
      });
    }
  };

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
    setFormData(files);
  }

  const handleFileUpload1 = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("PhotoIdBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      console.log(base64Data);
      console.log(extension);
      const newFile = base64Data + "." + extension;
      console.log(newFile);
      setFormData({
        ...formData,
        photo_id: newFile,
        PhotoIdBase64String: base64Data,
        PhotoIdExtension: extension,
      });
    }
  };
  // This function is triggered when the select changes

  const selectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption1(value);
  };
  const selectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption2(value);
  };
  const selectChange3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption3(value);
  };
  const selectChange4 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption4(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        setSelectedImage(result || dummyImg);
      };

      reader.readAsDataURL(file);
    }
  };

  const setactiveTab = () => {
    navigate(-1);
  };

  const handleRemoveItemClick = (idToRemove: any) => {
    setParents((prevParents) =>
      prevParents.filter((parent) => parent.id !== idToRemove)
    );
  };

  const handleAddItemClick = () => {
    setParents((prevParents) => [
      ...prevParents,
      { id: prevParents.length + 1 },
    ]);
  };

  const handleDateChange1 = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate1(selectedDates[0]);
  };
  const handleDateChange2 = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate2(selectedDates[0]);
  };

  const handleDateChange3 = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate3(selectedDates[0]);
  };

  const handleDateChange4 = (selectedDates: Date[]) => {
    // Assuming you only need the first selected date
    setSelectedDate4(selectedDates[0]);
  };
  const handlePickupTimeChange = (selectedDates: any) => {
    setSelectedPickupTime(selectedDates[0]);
  };
  const handleDroppOffTimeChange = (selectedDates: any) => {
    setSelectedDropOffTime(selectedDates[0]);
  };

  const handlePDFUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("PhotoIdBase64String") as HTMLFormElement
    ).files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const newPDF = base64Data + "." + extension;
      console.log(extension);
      setFormData({
        ...formData,
        photo_id: newPDF,
        PhotoIdBase64String: base64Data,
        PhotoIdExtension: extension,
      });
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="ph ph-user"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">Personal Information</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body></Card.Body>
                  <div className="mb-3">
                    <Form className="tablelist-form" onSubmit={onSubmitStudent}>
                      <input type="hidden" id="id-field" />
                      <Row>
                        <Row>
                          {/* <div
                              className="text-center"
                              style={{ marginBottom: "40px" }}
                            >
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <label
                                    htmlFor="users-image-input"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title="Select Image"
                                  >
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </label>
                                  <Form.Control
                                    className="d-none"
                                    defaultValue=""
                                    id="users-image-input"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e)}
                                  />
                                </div>
                                <div className="avatar-lg p-1">
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img
                                    src={`data:image/jpeg;base64, ${formData.id_file}`}
                                    alt={formData.firstName}
                                      id="id_file"
                                      className="avatar-md rounded-circle object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div> */}

                          <div className="text-center mb-3">
                            <div
                              className="position-relative d-inline-block"
                              style={{ marginBottom: "30px" }}
                            >
                              <div className="position-absolute top-100 start-100 translate-middle">
                                <label
                                  htmlFor="IdFileBase64String"
                                  className="mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title="Select Student Picture"
                                >
                                  <span className="avatar-xs d-inline-block">
                                    <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                      <i className="ri-image-fill"></i>
                                    </span>
                                  </span>
                                </label>
                                <input
                                  className="d-none"
                                  type="file"
                                  name="IdFileBase64String"
                                  id="IdFileBase64String"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e)}
                                />
                              </div>
                              <div className="avatar-xl">
                                <div className="avatar-title bg-light rounded-4">
                                  <img
                                    src={`data:image/jpeg;base64, ${formData.IdFileBase64String}`}
                                    alt={formData.firstName}
                                    id="IdFileBase64String"
                                    className="avatar-xl h-auto rounded-4 object-fit-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* First Name  == Done */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="firstName">
                                First Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                required
                                onChange={onChange}
                                value={formData.firstName}
                              />
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="lastName">
                                Last Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                required
                                onChange={onChange}
                                value={formData.lastName}
                              />
                            </div>
                          </Col>

                          {/* Birth_Date  == Done */}
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Date of Birth
                              </Form.Label>
                              <Flatpickr
                                value={selectedDate1!}
                                onChange={handleDateChange1}
                                className="form-control flatpickr-input"
                                placeholder="Select Date"
                                options={{
                                  dateFormat: "d M, Y",
                                }}
                                id="dateBirth"
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <Form.Label htmlFor="lastName">Class</Form.Label>
                              <Form.Control
                                type="text"
                                id="classStudent"
                                placeholder="Enter Student Class"
                                required
                                onChange={onChange}
                                value={formData.classStudent}
                              />
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <label
                                htmlFor="status_account"
                                className="form-label"
                              >
                                Account Status
                              </label>
                              <select
                                className="form-select text-muted"
                                name="status_account"
                                id="status_account"
                                onChange={selectChange1}
                              >
                                <option value="Status">Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="houseStreerNumber">
                                House Number and Street
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="houseStreerNumber"
                                placeholder="Enter House Number and Street"
                                onChange={onChange}
                                value={formData.houseStreerNumber}
                              />
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="deparment">
                                Departement
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="deparment"
                                placeholder="Enter Departement"
                                onChange={onChange}
                                value={formData.deparment}
                              />
                            </div>
                          </Col>
                          {/* <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Post Code
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="supplierName-field"
                                placeholder="Enter Post Code"
                                required
                                // onChange={onChange}
                                // value={formData.country}
                              />
                            </div>
                          </Col> */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="country">Country</Form.Label>
                              <Form.Control
                                type="text"
                                id="country"
                                placeholder="Enter Country"
                                required
                                onChange={onChange}
                                value={formData.country}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/*  Nationaity == Not Yet */}
                          {/* <Col lg={3}>
                              <div className="mb-3">
                                <Form.Label>Nationality</Form.Label>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    as="input"
                                    style={{
                                      backgroundImage: `url(${
                                        seletedCountry1.flagImg &&
                                        seletedCountry1.flagImg
                                      })`,
                                    }}
                                    className="form-control rounded-end flag-input form-select"
                                    placeholder="Select country"
                                    readOnly
                                    defaultValue={seletedCountry1.countryName}
                                  ></Dropdown.Toggle>
                                  <Dropdown.Menu
                                    as="ul"
                                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                                  >
                                    <SimpleBar
                                      style={{ maxHeight: "220px" }}
                                      className="px-3"
                                    >
                                      {(country || []).map(
                                        (item: any, key: number) => (
                                          <Dropdown.Item
                                            as="li"
                                            onClick={() =>
                                              setseletedCountry1(item)
                                            }
                                            key={key}
                                            className="dropdown-item d-flex"
                                          >
                                            <div className="flex-shrink-0 me-2">
                                              <Image
                                                src={item.flagImg}
                                                alt="country flag"
                                                className="options-flagimg"
                                                height="20"
                                              />
                                            </div>
                                            <div className="flex-grow-1">
                                              <div className="d-flex">
                                                <div className="country-name me-1">
                                                  {item.countryName}
                                                </div>
                                                <span className="countrylist-codeno text-muted">
                                                  {item.countryCode}
                                                </span>
                                              </div>
                                            </div>
                                          </Dropdown.Item>
                                        )
                                      )}
                                    </SimpleBar>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Col> */}
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="phone">
                                Phone Number
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="phone"
                                placeholder="Enter phone"
                                onChange={onChange}
                                value={formData.phone}
                              />
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Email
                              </Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                onChange={onChange}
                                value={formData.email}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Col lg={3}>
                              <div className="mb-3">
                                <label
                                  htmlFor="statusSelect"
                                  className="form-label"
                                >
                                  Profile Picture
                                </label>
                                <Form.Control
                                  type="file"
                                  id="supplierName-field"
                                  placeholder="Enter number"
                                  className="text-muted"
                                  required
                                />
                              </div>
                            </Col> */}
                        </Row>

                        <Col lg={12}>
                          <Card.Header>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-identification-card"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title">
                                  Identification and Authentication
                                </h5>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="card_id"
                                    className="form-label"
                                  >
                                    Student ID
                                  </label>
                                  <Form.Control
                                    type="text"
                                    id="card_id"
                                    placeholder="Enter number"
                                    onChange={onChange}
                                    value={formData.card_id}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Creation ID Date
                                  </Form.Label>
                                  <Flatpickr
                                    value={selectedDate2!}
                                    onChange={handleDateChange2}
                                    className="form-control flatpickr-input"
                                    placeholder="Select Date"
                                    options={{
                                      dateFormat: "d M, Y",
                                      onChange: (selectedDates: Date[]) => {
                                        setSelectedPickupTime(selectedDates[0]);
                                      },
                                    }}
                                    id="id_creation_date"
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="statusSelect"
                                    className="form-label"
                                  >
                                    Card Pdf File
                                  </label>
                                  <Form.Control
                                    name="PhotoIdBase64String"
                                    onChange={handlePDFUpload}
                                    type="file"
                                    id="PhotoIdBase64String"
                                    accept=".pdf"
                                    placeholder="Choose File"
                                    className="text-muted"
                                  />
                                </div>
                              </Col>

                              {/* <Col lg={3}>
                                <div className="text-center mb-3">
                                  <div
                                    className="position-relative d-inline-block"
                                    style={{ marginBottom: "30px" }}
                                  >
                                    <div className="position-absolute top-100 start-100 translate-middle">
                                      <label
                                        htmlFor="PhotoIdBase64String"
                                        className="mb-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Select Student Picture"
                                      >
                                        <span className="avatar-xs d-inline-block">
                                          <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                            <i className="ri-image-fill"></i>
                                          </span>
                                        </span>
                                      </label>
                                      <input
                                        className="d-none"
                                        type="file"
                                        name="PhotoIdBase64String"
                                        id="PhotoIdBase64String"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload1(e)}
                                      />
                                    </div>
                                    <div className="avatar-xl">
                                      <div className="avatar-title bg-light rounded-4">
                                        <img
                                          src={`data:image/jpeg;base64, ${formData.PhotoIdBase64String}`}
                                          alt="cardId"
                                          id="PhotoIdBase64String"
                                          className="avatar-xl h-auto rounded-4 object-fit-cover"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Col> */}

                              {/* <Card.Body>
                                <div className="dropzone my-dropzone">
                                  <Dropzone
                                    onDrop={(acceptedFiles) => {
                                      handleAcceptedFiles(acceptedFiles);
                                    }}
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <div className="dropzone dz-clickable text-center">
                                        <div
                                          className="dz-message needsclick"
                                          {...getRootProps()}
                                        >
                                          <div className="mb-3">
                                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                          </div>
                                          <h5>
                                            Drop files here or click to upload.
                                          </h5>
                                        </div>
                                      </div>
                                    )}
                                  </Dropzone>
                                  <div
                                    className="list-unstyled mb-0"
                                    id="file-previews"
                                  >
                                    {selectedFiles.map((f: any, i: number) => {
                                      return (
                                        <Card
                                          className="mt-1 mb-0 shadow-none border dz-preview dz-processing dz-image-preview dz-success dz-image  dz-complete"
                                          key={i + "-file"}
                                        >
                                          <div className="p-2">
                                            <Row className="align-items-center">
                                              <Col className="col-auto">
                                                <div className="image">
                                                  <img
                                                    // data-dz-thumbnail=""
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                  />
                                                </div>
                                              </Col>
                                              <Col>
                                                <Link
                                                  to="#"
                                                  className="text-muted font-weight-bold"
                                                >
                                                  {f.name}
                                                </Link>
                                                <p className="mb-0">
                                                  <strong>
                                                    {f.formattedSize}
                                                  </strong>
                                                </p>
                                              </Col>
                                            </Row>
                                          </div>
                                        </Card>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="error-msg mt-1">
                                  Please add a Card ID images.
                                </div>
                                <Form>
                                  <Form.Group controlId="pdfUpload">
                                    <Form.Label
                                      style={{
                                        marginTop: "20px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Upload PDF File
                                    </Form.Label>
                                    <Form.Control
                                      type="file"
                                      onChange={handlePdfChange}
                                      accept=".pdf"
                                    />
                                  </Form.Group>

                                  <Form.Group controlId="videoUpload">
                                    <Form.Label
                                      style={{
                                        marginTop: "25px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Upload Video File
                                    </Form.Label>
                                    <Form.Control
                                      type="file"
                                      onChange={handleVideoChange}
                                      accept="video/*"
                                    />
                                  </Form.Group>
                                </Form>
                              </Card.Body> */}
                            </Row>
                          </Card.Body>
                        </Col>

                        {/* 
                         <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-users-three"></i>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-grow-1">
                                  <h5 className="card-title">
                                    Parent/Guardian Information
                                  </h5>
                                </div>
                              </div>
                            </Card.Header>

                            <Card.Body>
                              {parents.map((parent) => (
                                <div key={parent.id}>
                                  <Row>
                            
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Full Name
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          id="supplierName-field"
                                          placeholder="Enter full name"
                                          required
                                        />
                                      </div>
                                    </Col>
                                
                                    <Col lg={3}>
                                      <div className="mb-3">
                                        <Form.Label htmlFor="supplierName-field">
                                          Relationship
                                        </Form.Label>
                                        <select
                                          className="form-select text-muted"
                                          name="choices-single-default"
                                          id="statusSelect"
                                          required
                                        >
                                          <option value="">Relationship</option>
                                          <option value="Mother">Mother</option>
                                          <option value="Father">Father</option>
                                          <option value="Guardian">
                                            Guardian
                                          </option>
                                          <option value="Other">Other</option>
                                        </select>
                                      </div>
                                    </Col>
                                    <Col lg={3}>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-icon"
                                        onClick={() =>
                                          handleRemoveItemClick(parent.id)
                                        }
                                        style={{ marginTop: "27px" }}
                                      >
                                        <i className="ri-delete-bin-5-line"></i>
                                      </button>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Row>
                                      <Col lg={3}>
                                        <div className="mb-3">
                                          <Form.Label htmlFor="emergencyContactToggle">
                                            Emergency Contact
                                          </Form.Label>
                                          <Form.Check
                                            type="switch"
                                            id="emergencyContactToggle"
                                            label=""
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </Row>
                                </div>
                              ))}
                              <Row>
                                <tr>
                                  <td>
                                    <Link
                                      to="#"
                                      id="add-item"
                                      className="btn btn-soft-secondary fw-medium"
                                      onClick={handleAddItemClick}
                                    >
                                      <i className="ri-add-fill me-1 align-bottom"></i>
                                    </Link>
                                  </td>
                                </tr>
                              </Row>
                            </Card.Body>
                          </Col>  */}
                        {/* 
                          <Col lg={12}>
                            <Card.Header>
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                      <i className="ph ph-share-network"></i>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-grow-1">
                                  <h5 className="card-title">Social Media</h5>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Facebook
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ph ph-facebook-logo"></i>
                                      </span>
                                      <input
                                        type="text"
                                        id="supplierName-field"
                                        className="form-control"
                                        placeholder="@Facebook"
                                        required
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Instgram
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ph ph-instagram-logo"></i>
                                      </span>
                                      <input
                                        type="text"
                                        id="supplierName-field"
                                        className="form-control"
                                        placeholder="@Instgram"
                                        required
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      Twitter
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ph ph-twitter-logo"></i>
                                      </span>
                                      <input
                                        type="text"
                                        id="supplierName-field"
                                        className="form-control"
                                        placeholder="@Twitter"
                                        required
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="statusSelect"
                                      className="form-label"
                                    >
                                      WhatsUp
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ph ph-whatsapp-logo"></i>
                                      </span>
                                      <input
                                        type="text"
                                        id="supplierName-field"
                                        className="form-control"
                                        placeholder="@WhatsUp"
                                        required
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Col> */}

                        <Col lg={12}>
                          <div className="d-flex align-items-start gap-3 mt-4">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none btn-label previestab"
                              onClick={() => setactiveTab()}
                            >
                              <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                              Back
                            </button>
                            <Button
                              variant="success"
                              type="submit"
                              className="w-sm"
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewStudent;
