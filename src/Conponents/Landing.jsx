import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Typography
          color="inherit"
          component={Link}
          to="/dashboard"
          variant="h6"
        >
          Go to Dashboard
        </Typography>
      </div>
    );
  }
}
