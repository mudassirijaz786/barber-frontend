import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Footer } from "./Conponents/layouts/index";
import Landing from "./Conponents/Landing.jsx";
import Signup from "./Conponents/Signup";
import Login from "./Conponents/Login";
import Home from "./Conponents/dashboard/Home";
import Test from "./Conponents/layouts/Test";
function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Home} />

        {/* <Test /> */}
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
