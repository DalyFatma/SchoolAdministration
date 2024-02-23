import React from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Import Images
import img4 from 'assets/images/products/img-4.png'
import img6 from 'assets/images/products/img-6.png'
import img7 from 'assets/images/products/img-7.png'

const Overview = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xxl={12} lg={6}>
                    <Card>
                        <Card.Header className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">Activity</h5>
                            <div className="flex-shrink-0">
                                <Dropdown>
                                    <Dropdown.Toggle href="#" className="arrow-none btn btn-ghost-primary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ph-dots-three-outline"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as="ul">
                                        <li><Dropdown.Item href="/#">Action</Dropdown.Item></li>
                                        <li><Dropdown.Item href="/#">Another action</Dropdown.Item></li>
                                        <li><Dropdown.Item href="/#">Something else here</Dropdown.Item></li>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <SimpleBar data-simplebar style={{ maxHeight: "440px" }}>
                                <div className="acitivity-timeline acitivity-main">
                                    <div className="acitivity-item d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar"></div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Purchase by Jacques Leon</h6>
                                            <p className="mb-2 text-muted"><small>12:45 PM Today</small></p>
                                            <p className="text-muted mb-0">Product noise evolve smartwatch </p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Today offers by <Link to="/seller-overview" className="link-secondary">themesbrand</Link></h6>
                                            <p className="mb-2 text-muted"><small>03:14 PM - 18 Jan, 2023</small></p>
                                            <p className="text-muted mb-0">Offer is valid on orders of Rs.500 Or above for selected products only.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar">
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Added new <span className="fw-semibold">style collection</span></h6>
                                            <p className="mb-2 text-muted"><small>9:47 PM Yesterday</small></p>
                                            <p className="text-muted mb-2">By Zibra Fashion</p>
                                            <div className="d-inline-flex gap-2 border border-dashed p-2">
                                                <Link to="#" className="bg-success-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img4} alt="" className="img-fluid d-block" />
                                                </Link>
                                                <Link to="#" className="bg-warning-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img6} alt="" className="img-fluid d-block" />
                                                </Link>
                                                <Link to="#" className="bg-info-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img7} alt="" className="img-fluid d-block" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Alina Holland have bookmark the products</h6>
                                            <p className="mb-2 text-muted"><small>04:30 AM - 29 Dec, 2022</small></p>
                                            <p className="text-muted mb-0">Allow users to bookmark products in your WooCommerce store.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar">
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Favoried Product</h6>
                                            <p className="mb-2 text-muted"><small>01:14 PM - 24 Nov, 2022</small></p>
                                            <p className="text-muted mb-0">Kristina Hooper have favorited product.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar">
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Flash sale starting <span className="text-primary">Tomorrow.</span></h6>
                                            <p className="mb-2 text-muted"><small>11:15 AM - 29 Oct, 2022</small></p>
                                            <p className="text-muted mb-0">Flash sale by <Link to="#" className="link-secondary fw-medium">Terry & Jerry Fashion</Link></p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Monthly sales report</h6>
                                            <p className="mb-2 text-muted"><small>04:57 PM - 11 Sep, 2022</small></p>
                                            <p className="text-muted mb-0"><span className="text-danger">1 days left</span> notification to submit the monthly sales report. <Link to="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar"></div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Frank Hook Review</h6>
                                            <p className="mb-2 text-muted"><small>04:57 PM - 26 Aug, 2022</small></p>
                                            <p className="text-warning mb-2"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></p>
                                            <p className="text-muted mb-0 fst-italic">" A product that has reviews is more likable to be sold than a product. "</p>
                                        </div>
                                    </div>
                                </div>
                            </SimpleBar>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xxl={12} lg={6}>
                    <Card>
                        <Card.Header className="d-flex">
                            <h5 className="card-title flex-grow-1 mb-0">Important Notes</h5>
                        </Card.Header>
                        <Card.Body>
                            <Swiper modules={[Autoplay]} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }}>
                                <div className="swiper-wrapper">
                                    <SwiperSlide>
                                        <div className="p-3 bg-secondary bg-opacity-10 rounded">
                                            <p className="mb-2 text-truncate-three-lines">Thanks to the pandemic, e-commerce has seen a surge of activity and new consumers. This projection is based on the fact that the sector is expected to grow at 20 percent annually.</p>
                                            <div className="text-end">
                                                <Link to="#!" className="link-secondary"><i>- Admin</i></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="p-3 bg-primary bg-opacity-10 rounded">
                                            <p className="mb-2 text-truncate-three-lines">Live shopping could be a great innovation to consider as part of your strategy in 2022 to further build customer engagement, loyalty</p>
                                            <div className="text-end">
                                                <Link to="#!"><i>- Zibra Fashion</i></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="p-3 bg-danger bg-opacity-10 rounded">
                                                <p className="mb-2 text-truncate-three-lines">Buying online has become necessary for some customers, especially if they are part of the at-risk groups.</p>
                                                <div className="text-end">
                                                    <Link to="#!" className="link-danger"><i>- Sales Manager</i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>

                            <form action="#!" className="mt-3">
                                <div className="mb-3">
                                    <Form.Label htmlFor="notesInput">Notes</Form.Label>
                                    <textarea className="form-control" id="notesInput"></textarea>
                                </div>
                                <div className="text-end">
                                    <Button variant='primary' type="button">Add Notes</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Overview;



// import React, { useState } from 'react';
// import { Alert, Button, Card, Col, Container, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap';
// import Breadcrumb from 'Common/BreadCrumb';
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
// import SimpleBar from 'simplebar-react';
// import { Link } from 'react-router-dom';

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// // Import Images
// import productsImg31 from "../../../assets/images/products/img-31.png";
// import productsImg32 from "../../../assets/images/products/img-32.png";
// import productsImg33 from "../../../assets/images/products/img-33.png";
// import productsImg34 from "../../../assets/images/products/img-34.png";

// import avatar1 from "../../../assets/images/users/avatar-1.jpg";
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar5 from "../../../assets/images/users/avatar-5.jpg";
// import avatar8 from "../../../assets/images/users/avatar-8.jpg";

// SwiperCore.use([FreeMode, Navigation, Thumbs]);

// const Overview = () => {

//     document.title = "Product Overview | Toner eCommerce + Admin React Template";

//     const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

//     return (
//         <React.Fragment>
//             <div className="page-content">
//                 <Container fluid={true}>
//                     <Breadcrumb title="Overview" pageTitle="Product" />
//                     <Row className="gx-lg-4">
//                         <Col xl={4} lg={8} className="mx-auto">
//                             <Row className="sticky-side-div">
//                                 <Col lg={12}>
//                                     <Alert variant="success" className="text-center">
//                                         Deals Of The Week
//                                     </Alert>
//                                 </Col>
//                                 <Col lg={2}>

//                                     <Swiper onSwiper={setThumbsSwiper} direction={"vertical"} slidesPerView={4} freeMode={true} watchSlidesProgress={true} spaceBetween={10} className="productSwiper productswiper-2 mb-3 mb-lg-0">
//                                         {/* thumbsSlider */}
//                                         <div className="swiper-wrapper product-wrapper">
//                                             <SwiperSlide>
//                                                 <div className="product-thumb rounded cursor-pointer">
//                                                     <img src={productsImg31} alt="" className="img-fluid" />
//                                                 </div>
//                                             </SwiperSlide>
//                                             <SwiperSlide>
//                                                 <div className="product-thumb rounded cursor-pointer">
//                                                     <img src={productsImg32} alt="" className="img-fluid" />
//                                                 </div>
//                                             </SwiperSlide>
//                                             <SwiperSlide>
//                                                 <div className="product-thumb rounded cursor-pointer">
//                                                     <img src={productsImg33} alt="" className="img-fluid" />
//                                                 </div>
//                                             </SwiperSlide>
//                                             <SwiperSlide>
//                                                 <div className="product-thumb rounded cursor-pointer">
//                                                     <img src={productsImg34} alt="" className="img-fluid" />
//                                                 </div>
//                                             </SwiperSlide>
//                                             <SwiperSlide>
//                                                 <div className="product-thumb rounded cursor-pointer">
//                                                     <img src={productsImg32} alt="" className="img-fluid" />
//                                                 </div>
//                                             </SwiperSlide>
//                                         </div>
//                                     </Swiper>

//                                 </Col>
//                                 <Col lg={10}>
//                                     <div className="bg-light rounded-2 position-relative ribbon-box overflow-hidden">

//                                         <Swiper navigation={true} thumbs={{ swiper: thumbsSwiper }} className="productSwiper2">
//                                             <div className="swiper-wrapper">
//                                                 <SwiperSlide>
//                                                     <img src={productsImg31} alt="" className="img-fluid" />
//                                                 </SwiperSlide>
//                                                 <SwiperSlide>
//                                                     <img src={productsImg32} alt="" className="img-fluid" />
//                                                 </SwiperSlide>
//                                                 <SwiperSlide>
//                                                     <img src={productsImg33} alt="" className="img-fluid" />
//                                                 </SwiperSlide>
//                                                 <SwiperSlide>
//                                                     <img src={productsImg34} alt="" className="img-fluid" />
//                                                 </SwiperSlide>
//                                                 <SwiperSlide>
//                                                     <img src={productsImg32} alt="" className="img-fluid" />
//                                                 </SwiperSlide>
//                                             </div>
//                                         </Swiper>

//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Col>

//                         <Col xl={8}>
//                             <div className="mt-5 mt-xl-0">
//                                 <div className="d-flex">
//                                     <div className="flex-grow-1">
//                                         <h4>Full Sleeve shirt for Men (Blue)</h4>
//                                         <div className="hstack gap-3 flex-wrap">
//                                             <div><Link to="#" className="text-primary d-block">Tony jon</Link></div>
//                                             <div className="vr"></div>
//                                             <div className="text-muted">Seller : <span className="text-body fw-medium">Zibra Fashion</span></div>
//                                             <div className="vr"></div>
//                                             <div className="text-muted">Published : <span className="text-body fw-medium">25 Jan, 2023</span></div>
//                                         </div>
//                                     </div>
//                                     <div className="flex-shrink-0">
//                                         <OverlayTrigger placement="top" overlay={<Tooltip id="top"> Edit </Tooltip>}>
//                                             <Link to="/product-create" className="btn btn-soft-secondary btn-icon">
//                                                 <i className="ri-pencil-fill align-bottom"></i>
//                                             </Link>
//                                         </OverlayTrigger>
//                                     </div>
//                                 </div>

//                                 <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
//                                     <div className="text-muted fs-16">
//                                         <span className="mdi mdi-star text-warning"></span>
//                                         <span className="mdi mdi-star text-warning"></span>
//                                         <span className="mdi mdi-star text-warning"></span>
//                                         <span className="mdi mdi-star text-warning"></span>
//                                         <span className="mdi mdi-star text-warning"></span>
//                                     </div>
//                                     <div className="text-muted">( 50 Review )</div>
//                                 </div>

//                                 <Row className="mt-4">
//                                     <Col lg={3} sm={6} className="g-3">
//                                         <div className="p-2 border border-dashed rounded text-center">
//                                             <p className="mb-2 text-uppercase text-muted fs-13">Price :</p>
//                                             <h5 className="mb-0">$120.40</h5>
//                                         </div>
//                                     </Col>

//                                     <Col lg={3} sm={6} className="g-3">
//                                         <div className="p-2 border border-dashed rounded text-center">
//                                             <p className="mb-2 text-uppercase text-muted fs-13">No. of Orders :</p>
//                                             <h5 className="mb-0">2,234</h5>
//                                         </div>
//                                     </Col>

//                                     <Col lg={3} sm={6} className="g-3">
//                                         <div className="p-2 border border-dashed rounded text-center">
//                                             <p className="mb-2 text-uppercase text-muted fs-13">Available Stocks :</p>
//                                             <h5 className="mb-0">1,230</h5>
//                                         </div>
//                                     </Col>

//                                     <Col lg={3} sm={6} className="g-3">
//                                         <div className="p-2 border border-dashed rounded text-center">
//                                             <p className="mb-2 text-uppercase text-muted fs-13">Total Revenue :</p>
//                                             <h5 className="mb-0">$60,645</h5>
//                                         </div>
//                                     </Col>
//                                 </Row>

//                                 <Row>
//                                     <Col xl={6}>
//                                         <div className=" mt-4">
//                                             <h5 className="fs-15 mb-3">Colors :</h5>
//                                             <div className="d-flex flex-wrap gap-2">

//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Out of Stock">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-primary" disabled>
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="03 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-secondary">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="03 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-success">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="02 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-info">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="01 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-warning">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="04 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-danger">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="03 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-light">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="04 Items Available">
//                                                     <Button variant='white' className="avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-24 text-dark">
//                                                         <i className="ri-checkbox-blank-circle-fill"></i>
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Col>

//                                     <Col xl={6}>
//                                         <div className="mt-4">
//                                             <h5 className="fs-15 mb-3">Sizes :</h5>
//                                             <div className="d-flex flex-wrap gap-2">
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Out of Stock">
//                                                     <input type="radio" className="btn-check" name="productsize-radio" id="productsize-radio1" disabled />
//                                                     <label className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center" htmlFor="productsize-radio1">S</label>
//                                                 </div>

//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="04 Items Available">
//                                                     <input type="radio" className="btn-check" name="productsize-radio" id="productsize-radio2" />
//                                                     <label className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center" htmlFor="productsize-radio2">M</label>
//                                                 </div>
//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="06 Items Available">
//                                                     <input type="radio" className="btn-check" name="productsize-radio" id="productsize-radio3" />
//                                                     <label className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center" htmlFor="productsize-radio3">L</label>
//                                                 </div>

//                                                 <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Out of Stock">
//                                                     <input type="radio" className="btn-check" name="productsize-radio" id="productsize-radio4" />
//                                                     <label className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center" htmlFor="productsize-radio4">XL</label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Col>
//                                 </Row>


//                                 <div className="mt-4 text-muted">
//                                     <h5 className="fs-15">Description :</h5>
//                                     <p>Long sleeve T-shirts are as the name suggests, <b>T-shirts with their sleeves extended to cover the entire arm up to the wrist</b>. These shirts combine the casual and comfortable feel of a T-shirt with the full covering of a business/dress shirt. I won't say not to wear these colors, but these colors don't compliment your skin tone the best. Wear warm colors.</p>
//                                     <p><b>Whites</b>, <b>pastels</b>, <b>shades of purple</b>, <b>pink</b>, <b>rich yellow</b>, and <b>orange</b> look good with your skin. The colors dark skin men should avoid are black or dark brown.</p>
//                                 </div>

//                                 <div className="mt-3 mb-4">
//                                     <h5 className="fs-15 mb-3">Services :</h5>
//                                     <Row>
//                                         <Col lg={4}>
//                                             <div className="d-flex align-items-center gap-2">
//                                                 <div className="avatar-xs">
//                                                     <div className="avatar-title bg-danger-subtle text-danger fs-15 rounded">
//                                                         <i className="bi bi-recycle"></i>
//                                                     </div>
//                                                 </div>
//                                                 <h6 className="mb-0">10 Days Replacement</h6>
//                                             </div>
//                                         </Col>
//                                         <Col lg={4}>
//                                             <div className="d-flex align-items-center gap-2">
//                                                 <div className="avatar-xs">
//                                                     <div className="avatar-title bg-success-subtle text-success fs-15 rounded">
//                                                         <i className="bi bi-cash-coin"></i>
//                                                     </div>
//                                                 </div>
//                                                 <h6 className="mb-0">Cash on Delivery available</h6>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                 </div>

//                                 <h5 className="fs-15">Product Details:</h5>
//                                 <div className="table-responsive">
//                                     <table className="table table-sm table-borderless align-middle description-table">
//                                         <tbody>
//                                             <tr>
//                                                 <th>Type</th>
//                                                 <td>Stripped shirts</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Sleeve</th>
//                                                 <td>Full Sleeve</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Country of Origin</th>
//                                                 <td>India</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Pack of</th>
//                                                 <td>1</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Style</th>
//                                                 <td>Modern</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Style Code</th>
//                                                 <td>TBS037</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Generic Name</th>
//                                                 <td>Formal Shirt</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Ideal For</th>
//                                                 <td>Men</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Size</th>
//                                                 <td>All Available</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Suitable For</th>
//                                                 <td>Formal Wear,Party Wear</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Seller</th>
//                                                 <td>Zibra Fashion</td>
//                                             </tr>
//                                             <tr>
//                                                 <th>Fabric</th>
//                                                 <td>Cotton</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div>
//                                     <div className="d-flex flex-wrap gap-4 justify-content-between align-items-center mt-4">
//                                         <div className="flex-shrink-0">
//                                             <h5 className="fs-15 mb-3 fw-medium">Total Rating's</h5>
//                                             <h2 className="fw-bold mb-3">10.14k</h2>
//                                             <p className="text-muted mb-0">Growth in reviews on this year</p>
//                                         </div>
//                                         <hr className="vr" />
//                                         <div className="flex-shrink-0">
//                                             <h5 className="fs-15 mb-3 fw-medium">Average Rating</h5>
//                                             <h2 className="fw-bold mb-3">5.6 <span className="fs-16 align-middle text-warning ms-2">
//                                                 <i className="ri-star-fill"></i>
//                                                 <i className="ri-star-fill"></i>
//                                                 <i className="ri-star-fill"></i>
//                                                 <i className="ri-star-fill"></i>
//                                                 <i className="ri-star-half-fill"></i>
//                                             </span></h2>
//                                             <p className="text-muted mb-0">Average rating on this year</p>
//                                         </div>
//                                         <hr className="vr" />
//                                         <div className="flex-shrink-0 w-xl">
//                                             <Row className="align-items-center g-3 align-items-center mb-2">
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13"><i className="ri-star-fill text-warning me-1 align-bottom"></i>5</h6>
//                                                     </div>
//                                                 </Col>
//                                                 <Col>
//                                                     <ProgressBar variant="primary" className="progress-sm" now={50.16} />
//                                                 </Col>
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13">2758</h6>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <Row className="align-items-center g-3 mb-2">
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13"><i className="ri-star-fill text-warning me-1 align-bottom"></i>4</h6>
//                                                     </div>
//                                                 </Col>
//                                                 <Col>
//                                                     <ProgressBar variant="success" className="progress-sm" now={29.32} />
//                                                 </Col>
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13">1063</h6>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <Row className="align-items-center g-3 mb-2">
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13"><i className="ri-star-fill text-warning me-1 align-bottom"></i>3</h6>
//                                                     </div>
//                                                 </Col>
//                                                 <Col>
//                                                     <ProgressBar variant="info" className="progress-sm" now={18.12} />
//                                                 </Col>
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13">997</h6>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <Row className="align-items-center g-3 mb-2">
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13"><i className="ri-star-fill text-warning me-1 align-bottom"></i>2</h6>
//                                                     </div>
//                                                 </Col>
//                                                 <Col>
//                                                     <ProgressBar variant="secondary" className="progress-sm" now={4.98} />
//                                                 </Col>
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13">227</h6>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <Row className="align-items-center g-3">
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13"><i className="ri-star-fill text-warning me-1 align-bottom"></i>2</h6>
//                                                     </div>
//                                                 </Col>
//                                                 <Col>
//                                                     <ProgressBar variant="danger" className="progress-sm" now={7.42} />
//                                                 </Col>
//                                                 <Col className="col-auto">
//                                                     <div>
//                                                         <h6 className="mb-0 text-muted fs-13">408</h6>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                         </div>
//                                     </div>

//                                     <SimpleBar className="mt-4" data-simplebar="init" style={{ maxHeight: "350px" }}>
//                                         <div className="d-flex p-3 border-bottom border-bottom-dashed">
//                                             <div className="flex-shrink-0 me-3">
//                                                 <img className="avatar-xs rounded-circle" src={avatar5} alt="" />
//                                             </div>
//                                             <div className="flex-grow-1">
//                                                 <div className="d-flex mb-3">
//                                                     <div className="flex-grow-1">
//                                                         <div>
//                                                             <div className="mb-2 fs-12">
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-line text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-line text-warning align-bottom"></i></span>
//                                                             </div>
//                                                             <h6 className="mb-0">Donald Risher</h6>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex-shrink-0">
//                                                         <p className="mb-0 text-muted"><i className="ri-calendar-event-fill me-2 align-middle"></i>Oct 28, 2023</p>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <h5 className="lh-base fs-17">Design Quality</h5>
//                                                     <p className="mb-0">
//                                                         " This is an incredible framework worth so much in the right hands! Nowhere else are you going to get so much flexibility and great code for a few dollars. Highly recommend purchasing today! Like right now! "
//                                                     </p>
//                                                 </div>
//                                                 <div className="d-flex mt-4">
//                                                     <div className="flex-shrink-0 me-3">
//                                                         <img className="avatar-xs rounded-circle" src={avatar1} alt="" />
//                                                     </div>
//                                                     <div className="flex-grow-1">
//                                                         <div className="d-flex mb-3">
//                                                             <div className="flex-grow-1">
//                                                                 <div>
//                                                                     <h6 className="mb-2">Jansh Brown</h6>
//                                                                     <p className="mb-0 text-muted fs-14">Admin</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="flex-shrink-0">
//                                                                 <p className="mb-0 text-muted"><i className="ri-calendar-event-fill me-2 align-middle"></i>Feb 04, 2023</p>
//                                                             </div>
//                                                         </div>
//                                                         <p className="mb-0">
//                                                             Thank You
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex p-3 border-bottom border-bottom-dashed">
//                                             <div className="flex-shrink-0 me-3">
//                                                 <img className="avatar-xs rounded-circle" src={avatar3} alt="" />
//                                             </div>
//                                             <div className="flex-grow-1">
//                                                 <div className="d-flex mb-3">
//                                                     <div className="flex-grow-1">
//                                                         <div>
//                                                             <div className="mb-2 fs-12">
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                             </div>
//                                                             <h6 className="mb-0">Richard Smith</h6>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex-shrink-0">
//                                                         <p className="mb-0 text-muted"><i className="ri-calendar-event-fill me-2 align-middle"></i>Dec 10, 2022</p>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <h5 className="lh-base fs-17">Feature Availability</h5>
//                                                     <p className="mb-0">
//                                                         " Hello everyone, I would like to suggest here two contents that you could create. Course pages and blog pages. In them you could insert the listing and management of courses and listing and management of blog. The theme is perfect, one of the best purchases I've ever made. "
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex p-3">
//                                             <div className="flex-shrink-0 me-3">
//                                                 <img className="avatar-xs rounded-circle" src={avatar8} alt="" />
//                                             </div>
//                                             <div className="flex-grow-1">
//                                                 <div className="d-flex mb-3">
//                                                     <div className="flex-grow-1">
//                                                         <div>
//                                                             <div className="mb-2 fs-12">
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-half-fill text-warning align-bottom"></i></span>
//                                                                 <span> <i className="ri-star-line text-warning align-bottom"></i></span>
//                                                             </div>
//                                                             <h6 className="mb-0">Pauline Moll</h6>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex-shrink-0">
//                                                         <p className="mb-0 text-muted"><i className="ri-calendar-event-fill me-2 align-middle"></i>Jan 28, 2023</p>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <h5 className="lh-base fs-17">Design Quality</h5>
//                                                     <p className="mb-0">
//                                                         "We have used your other templates as well and seems it's amazing with the design and code quality. Wish you best for the future updates. Keep updated you will be #1 in near future. "
//                                                     </p>
//                                                 </div>
//                                                 <div className="d-flex mt-4">
//                                                     <div className="flex-shrink-0 me-3">
//                                                         <img className="avatar-xs rounded-circle" src={avatar1} alt="" />
//                                                     </div>
//                                                     <div className="flex-grow-1">
//                                                         <div className="d-flex mb-3">
//                                                             <div className="flex-grow-1">
//                                                                 <div>
//                                                                     <h6 className="mb-2">Jansh Brown</h6>
//                                                                     <p className="mb-0 text-muted fs-14">Admin</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="flex-shrink-0">
//                                                                 <p className="mb-0 text-muted"><i className="ri-calendar-event-fill me-2 align-middle"></i>Aug 16, 2022</p>
//                                                             </div>
//                                                         </div>
//                                                         <p className="mb-0">
//                                                             Thank You
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </SimpleBar>
//                                     <Card className="p-4">
//                                         <h5 className="fs-18 mb-3">Add a Review</h5>
//                                         <div>
//                                             <form action="#" className="form">
//                                                 <div className="d-flex align-items-center mb-3">
//                                                     <h6 className="fs-14 mb-0">Your rating:</h6>
//                                                     <div className="ms-3">
//                                                         <span className="fs-14"> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                         <span className="fs-14"> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                         <span className="fs-14"> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                         <span className="fs-14"> <i className="ri-star-fill text-warning align-bottom"></i></span>
//                                                         <span className="fs-14"> <i className="ri-star-half-fill text-warning align-bottom"></i></span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <input className="form-control" name="your-name" placeholder="Title" type="text" />
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <textarea className="form-control" name="your-commemt" placeholder="Enter your comments &amp; reviews" rows={4}></textarea>
//                                                 </div>
//                                                 <div className="text-end">
//                                                     <Button variant="primary" className="btn-hover" type="submit" value="Submit">Send Review <i className="ri-send-plane-2-line align-bottom ms-1"></i></Button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </React.Fragment >
//     );
// };

// export default Overview;