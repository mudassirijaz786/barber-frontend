import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Typography color="inherit" variant="h2">
          This is dashboard
        </Typography>
        <Typography
          color="inherit"
          component={Link}
          to="/services/add"
          variant="h6"
        >
          Add services
        </Typography>
        <Typography color="inherit" component={Link} to="/upload" variant="h6">
          Upload
        </Typography>
      </div>
    );
  }
}
