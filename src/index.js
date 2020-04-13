import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import Test from "../src/Components/Test";
import * as serviceWorker from "./serviceWorker";
<<<<<<< HEAD
import Add_Service from "./Conponents/AddService";
import Schedule from "./Conponents/calander";
import CardMaterial from "./Conponents/dashboard/CardMaterial";
import Time from "./Conponents/time";
import Sidebar from "./Conponents/layouts/sidemenu";
import Times from "./Conponents/timepicker";
import Sign_Up from "./Conponents/Signup";
import MapContainer from "./Conponents/map";
import SimpleMap from "./Conponents/map2";
import LocationPickerExample from "./Conponents/locationpicker";
import MyFancyComponent from "./Conponents/rectgooglempas";
import SwitchExample from "./Conponents/Salon_availibilty";

//import Add_Service from "./Conponents/AddService";
ReactDOM.render(<SwitchExample />, document.getElementById("root"));
=======
//import Add_Service from "./Conponents/AddService";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
>>>>>>> 4fd9c6bfe6c8b195c5771d7e0d6266681e81002f

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
