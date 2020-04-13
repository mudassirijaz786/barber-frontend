import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  control: {
    padding: 10,
  },
  button: {
    background: "linear-gradient(45deg, #020024 30%, #090979 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    width: 200,
    marginBottom: 15,
    padding: "0 30px",
  },
  paperInner: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 15,
    flexGrow: 1,
    flexWrap: "wrap",
    margin: 15,
  },
  text: { color: "green", marginRight: 15 },
  paper: {
    justifyContent: "center",
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    marginTop: 15,
  },
  switch: {
    paddingBottom: 5,
  },
});
class Available extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = async (e) => {
    console.log(this.state.checked);
    console.log("token in availible", localStorage.getItem("x-auth-token"));

    axios({
      url:
        // "http://localhost:5000/Digital_Saloon.com/api/Salon/availibilty",
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Salon/availibilty",
      method: "POST",
      Salon_availibilty: this.state.checked,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("RESPONSE", response);
        window.location = "/calender";
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            backendError: error.response.data,
          });
        }
      });
  };
  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { classes } = this.props;

    const { checked } = this.state;
    console.log("checked in render", checked);
    return (
      <Grid center container spacing={3} className={classes.root}>
        <Grid item center xs={8} sm={4} lg={4} md={4} spacing={10}>
          <Paper elevation={8} className={classes.paper}>
            <Paper elevation={8} className={classes.paperInner}>
              <span>
                <Typography className={classes.text}>
                  Do you want to turn off your
                </Typography>
              </span>
              <Switch
                className={classes.switch}
                onChange={this.handleChange}
                checked={this.state.checked}
              />
            </Paper>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleSubmit}
            >
              Done?
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Available.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Available);
