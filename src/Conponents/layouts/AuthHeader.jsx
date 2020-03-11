import React, { Component } from "react";
import Drawer from "../dashboard/Drawer";
import Header from "../layouts/Header";
export default class AuthHeader extends Component {
  render() {
    return (
      <div>
        {" "}
        {localStorage.getItem("x-auth-token") ? <Drawer /> : <Header />}
      </div>
    );
  }
}
