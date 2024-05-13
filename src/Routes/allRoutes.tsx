import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

import Categories from "pages/Products/Categories";
import SubCategories from "pages/Products/SubCategories";

// Orders
import OrdersListView from "pages/Orders/ListView";
import OrdersOverview from "pages/Orders/Overview";

// Calender
import Calendar from "pages/Calendar";

// Sellers
import SellersListView from "pages/Sellers/ListView";
import SellersGridView from "pages/Sellers/GridView";
import SellersOverview from "pages/Sellers/Overview";

// Invoice
import InvoiceList from "pages/Invoices/InvoiceList";
import InvoiceDetails from "pages/Invoices/InvoiceDetails";
import CreateInvoice from "pages/Invoices/CreateInvoice";

// User List
import UsersList from "pages/UsersList";

// Shipping
import Shipments from "pages/Shipping/Shipments";
import ShippingList from "pages/Shipping/ShippingList";

//Review & Rating
import ReviewRating from "pages/Reviews-Rating";

//Brands
import Brands from "pages/Brands";

//statistics
import Statistics from "pages/Statistics";

// Localization
import Transactions from "pages/Localization/Transactions";
import CurrencyRates from "pages/Localization/CurrencyRates";

// Accounts
// import MyAccount from "pages/Accounts/MyAccount";
// import Settings from "pages/Accounts/Settings";
import SignIn from "pages/AccountsAuth/AuthenticationInner/SignIn";
import PasswordReset from "pages/AccountsAuth/AuthenticationInner/PasswordReset";
import PasswordCreate from "pages/AccountsAuth/AuthenticationInner/PasswordCreate";
import SuccessMessage from "pages/AccountsAuth/AuthenticationInner/SucessMessage";
import TwoStepVerify from "pages/AccountsAuth/AuthenticationInner/TwoStepVerify";
import BasicLogout from "pages/AccountsAuth/AuthenticationInner/Logout";
import Error404 from "pages/AccountsAuth/AuthenticationInner/Error404";
import Error500 from "pages/AccountsAuth/AuthenticationInner/Error500";
import ComingSoon from "pages/AccountsAuth/AuthenticationInner/ComingSoon";

import UserProfile from "pages/Authentication/user-profile";

//? Notes
import Notes from "pages/Notes";
import AddNewGroup from "pages/Students/Groups/AddNewGroup";
import AddNewStudent from "pages/Accounts/Students/AddNewStudent";

import InvoiceListTable from "pages/Invoices/InvoiceList/InvoiceListTable";
import Groups from "pages/Students/Groups/Index";
import ReportingManagement from "../pages/Tools/ReportingManagement/index"
import Tracking from "../pages/Tracking/MapTracking"
import Attendances from "pages/Students/Attendances/index";
import PayementManagement from "../pages/Tools/PayementManagment/index"
import DelaysChanges from "../pages/Tracking/DelaysChanges/index"
import Programming from "../pages/Promgramming/Scheduling/index"
import OperationsManagement from "pages/OperationManagement/index";
import Students from "pages/Accounts/Students/index"
import AddNewParent from "pages/Accounts/Parents/AddNewParent";
import Parents from "pages/Accounts/Parents";
import TripsManagement from "pages/Promgramming/TripsManagement";
import Offers from "pages/Tools/Offers/index";
import Station from "pages/Promgramming/Stations/index";
import Contract from "pages/ProgramRoutes/Contract";
import ExtraTrip from "pages/ExtraTrip";
import ListExtraTrip from "pages/ExtraTrip/ListExtraTrip";
import AddNewStation from "pages/Promgramming/Stations/AddNewStation";
import SingleProfile from "pages/Accounts/Students/SingleAccount";
import EditStudent from "pages/Accounts/Students/EditStudent";
import ContractDetails from "pages/ProgramRoutes/Contract/ContractDetails";
import ParentDetails from "pages/Accounts/Parents/ParentDetails";
import ReportError from "pages/Help/RepportError";
import RequestFeature from "pages/Help/RequestFeature";
import UserManual from "pages/Help/UserManuel";
import ProgramRoutes from "pages/ProgramRoutes";
import Profile from "pages/Accounts/Students/Profil";
import Settings from "pages/Settings";
import EditParent from "pages/Accounts/Parents/EditParent";
import ProgramDetails from "pages/ProgramRoutes/ProgramDetails";
import Program from "pages/Program";
import AddProgramm from "pages/ProgramRoutes/AddProgramm";
import Login from "pages/Authentication/Login";
import Claims from "pages/Claims/Index";
import ArchivedComplains from "pages/Claims/ArchivedComplains";

import ProgramGroups from "pages/ProgramRoutes/ProgramGroups"
import StopsManagement from "pages/ProgramRoutes/StopsManagement";

const authProtectedRoutes = [
  
  { path: "/dashboard", component: <Dashboard /> },

  //? Tracking
  { path: "/map-tracking", component: <Tracking /> },
  { path: "/delays&changes", component: <DelaysChanges /> },

  { path: "/programgroups", component: <ProgramGroups /> },

  { path: "/stopsmanagement", component: <StopsManagement /> },
  // ? operations management

  { path: "/operations-management", component: <OperationsManagement /> },
  // ? extra trips
  { path: "/add-extraTrip/extra-trips", component: <ExtraTrip /> },
    // ? extra trips
    { path: "/list-extra-trips", component: <ListExtraTrip/> },
  // ? contracts
  { path: "/contracts", component: <Contract /> },
  // contract details

 { path: "/contract/:id", component: <ContractDetails /> },

  // ? Students
  { path: "/groups", component: <Groups /> },
  { path: "/attendances", component: <Attendances /> },

  //parent details
  { path: "/parents/parent-details", component: <ParentDetails /> },
  //?  add students path
  { path: "/students/add-student", component: <AddNewStudent /> },
   //?  edit parents path
   { path: "/parents/edit-parent", component: <EditParent /> },

   //?  add students path
   { path: "/students/edit-student/:id", component: <EditStudent /> },
   //?  add parents path
   { path: "/parents/add-parent", component: <AddNewParent /> },
 //?  add groups path
 { path: "/groups/add-group", component: <AddNewGroup /> },
 //?  add groups path
 { path: "/students", component: < Students/> },
 { path: "/parents", component: < Parents/> },
 // report error 
 { path: "/report-error", component: < ReportError/> },
  // request feature 
  { path: "/request-feature", component: < RequestFeature/> },
   // user manual 
 { path: "/user-manual", component: < UserManual/> },

 //? Programming
 { path: "/trips-management", component: <TripsManagement /> },
 { path: "/scheduling", component: <Programming /> },
 { path: "/offers", component: <Offers /> },
 { path: "/stations", component: <Station /> },
 { path: "/trip-models", component: <SellersGridView /> },
 // add station
 { path: "/add-station/stations", component: <AddNewStation /> },
 //? Group page
 { path: "/groups", component: <Groups /> },
// View Profile student
{ path: "/student/view-profile", component: <Profile /> },
 //? Claims Management
 {path:"/complains", component: <Claims/>},
// ? Archive Claims
{path:"/complains/archive", component: <ArchivedComplains/>},
  //settings
  {path:"/settings", component: <Settings/>},

  //? Add station
  {path:"/stations/add-station", component: <AddNewStation/>},

    //? Add programm
    {path:"/programming/add-program", component: <AddProgramm/>},
    // program routes
    {path:"/programming/listofprogram", component: <ProgramRoutes/>},

 //? Payment Management
 { path: "/payement-management", component: <PayementManagement /> },
 //? Reporting Management
{ path: "/reporting-management", component: <ReportingManagement /> },

 //? Notes
 { path: "/notes", component: <Notes /> },

 { path: "/contract", component: <InvoiceDetails /> },

 { path: "/invoices", component: <InvoiceListTable /> },

 { path: "/programming/listofprogram", component: < ProgramRoutes/> },
 { path: "/program-details/:name", component: < ProgramDetails/> },
 { path: "/program", component: < Program/> },



 { path: "/", exact: true, component: <Navigate to="/map-tracking" /> },
  { path: "*", component: <Navigate to="/map-tracking" /> },
  { path: "/user-profile", component: <UserProfile /> },

];

const publicRoutes = [
  // AuthenticationInner
  { path: "/login", component: <Login /> },
  { path: "/auth-pass-reset-basic", component: <PasswordReset /> },
  { path: "/auth-pass-change-basic", component: <PasswordCreate /> },
  { path: "/auth-success-msg-basic", component: <SuccessMessage /> },
  { path: "/auth-twostep-basic", component: <TwoStepVerify /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-404", component: <Error404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/coming-soon", component: <ComingSoon /> },
  

 // this route should be at the end of all other routes
 // eslint-disable-next-line react/display-name


];

export { authProtectedRoutes, publicRoutes };

