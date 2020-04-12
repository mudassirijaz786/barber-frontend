import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Opps ... Sorry, the page you are looking up is not found
        </h1>
      </div>
    );
  }
}
