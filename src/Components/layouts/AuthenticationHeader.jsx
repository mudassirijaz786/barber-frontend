import React, { Component } from "react";
import Drawer from "../common/Drawer";
export default class AuthenticationHeader extends Component {
  render() {
    return (
      <div>{localStorage.getItem("x-auth-token") ? <Drawer /> : null}</div>
    );
  }
}
