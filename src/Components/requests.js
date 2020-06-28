import React, { Component } from "react";

import axios from "axios";
import { Chart } from "primereact/chart";

import getData from "../utils/getData";
import { ipUrl } from "../config.json";
export default class RequetsGraph extends Component {
  state = {};
  componentDidMount = () => {
    console.log("ds");
    this.loadIpStats();
  };
  loadIpStats = () => {
    // fetch(ipUrl + "/ip/report/today")
    //   .then((result) => {
    //     console.log(result);
    //     console.log("hello");

    //     const ipStats = getData(result, "Traffic Stats", this.state.days);
    //     this.setState({ ipStats });
    //   })
    //   .catch((err) => {
    //     console.log("Can’t access " + ipUrl + " response. Blocked by browser?");
    //   });

    // FIXME: cors ka error ara ha ... response main kch ne ara
    console.log("hlo");
    axios
      .get(ipUrl + "/ip/report/today")
      .then((result) => {
        console.log(result);

        const ipStats = getData(result, "Traffic Stats", this.state.days);
        this.setState({ ipStats });
      })
      .catch((err) => {
        console.log("Can’t access " + ipUrl + " response. Blocked by browser?");
      });

    // ipService.getData().then((data) => {
    //   // console.log(data);
    //   const ipStats = getData(data, "Traffic Stats", this.state.days);
    //   this.setState({ ipStats });
    // request here to get state  as report/today and then pass theem to the getDate function...
    // });
  };
  render() {
    return (
      <React.Fragment>
        <Chart type="line" data={this.state.ipStats} />
      </React.Fragment>
    );
  }
}
///isy chla ab..
