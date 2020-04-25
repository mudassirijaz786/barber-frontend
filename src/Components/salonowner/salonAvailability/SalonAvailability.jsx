//importing
import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { ToastsStore } from "react-toasts";
import {
  Button,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Box,
  Container,
} from "@material-ui/core";

//styling
const styles = {
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
};

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

//class SalonAvailability
class SalonAvailability extends Component {
  constructor() {
    super();
    this.state = { checked: false, isLoading: false };
  }
  handleSubmit = async () => {
    const { checked } = this.state;
    this.setState({ isLoading: true });
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Salon/availibilty",
      method: "POST",
      Salon_availibilty: checked,
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
            isLoading: false,
          });
        }
      });
  };

  handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    const { classes } = this.props;
    const { checked, isLoading } = this.state;

    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            {isLoading && <ColorLinearProgress size={30} />}
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
                    checked={checked}
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

SalonAvailability.propTypes = {
  classes: PropTypes.object.isRequired,
};

// exporting SalonAvailability
export default withStyles(styles)(SalonAvailability);
