import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { ToastsStore } from "react-toasts";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
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
  paperInnerBottom: {
    display: "flex",
    justifyContent: "center",
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
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);
class Available extends Component {
  constructor() {
    super();
    this.state = { checked: false, isLoading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = async (e) => {
    console.log(this.state.checked);
    console.log("token in availible", localStorage.getItem("x-auth-token"));
    this.setState({ isLoading: true });

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
        ToastsStore.success(
          "Your availability has been changed successfully",
          3000
        );
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          window.location = "/calender";
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);

          this.setState({
            backendError: error.response.data,
            isLoading: false,
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
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            {this.state.isLoading && <ColorLinearProgress size={30} />}

            <Container component="main" maxWidth="xs">
              <Box color="indigo">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  Availability
                </Typography>
              </Box>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Please make availability of your salon
              </Typography>
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

                <Paper className={classes.paperInnerBottom}>
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
              </Paper>
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Available.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Available);
