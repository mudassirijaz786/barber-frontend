import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Add_Service from "./Conponents/AddService";
import Schedule from "./Conponents/calander";
import CardMaterial from "./Conponents/dashboard/CardMaterial";
import Time from "./Conponents/time";
import Sidebar from "./Conponents/layouts/sidemenu";
import Times from "./Conponents/timepicker";
import Sign_Up from "./Conponents/Signup";
//import Add_Service from "./Conponents/AddService";
ReactDOM.render(<Sign_Up />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
