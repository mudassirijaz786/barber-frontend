import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Footer } from "./Conponents/layouts/index";
import Landing from "./Conponents/Landing.jsx";
import Signup from "./Conponents/Signup";
import Login from "./Conponents/Login";
import Home from "./Conponents/dashboard/Home";
// import Test from "./Conponents/layouts/Test";
import AddServices from "./Conponents/AddService";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Upload from "./Conponents/dashboard/Upload.jsx";
import CardMaterial from "./Conponents/dashboard/CardMaterial";
import CardEdit from "./Conponents/dashboard/CardEdit";
import changePassword from "./Conponents/changePassword";
import Schedule from "./Conponents/dashboard/Schedule";
import ViewSchedule from "./Conponents/dashboard/ViewSchedule";
import AuthHeader from "./Conponents/layouts/AuthHeader";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Route exact path="/" component={AuthHeader} />

        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/password/change" component={changePassword} />
        <Route exact path="/viewschedule" component={ViewSchedule} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/services/add" component={AddServices} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/services" component={CardMaterial} />
        <Route exact path="/services/edit" component={CardEdit} />
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
