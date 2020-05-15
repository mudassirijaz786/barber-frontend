//importing
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./animations/landing.json";
import { Typography, Grid, Button, Box, withStyles } from "@material-ui/core";
import Authorization from "./Authorization";

//styling
const styles = {
  root: {
    flexGrow: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
  },
  button: {
    background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    margin: 15,
    padding: "0 30px",
  },
};

//animated Lottie
const defaultOptions = {
  animationData,
};

//class Landing
class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    if (
      Authorization.isSalonOnwer().auth &&
      Authorization.isSalonOnwer().role === "Salon_Owner_login"
    ) {
      return <Redirect to="/dashboard" />;
    }
    if (
      Authorization.isAdmin().auth &&
      Authorization.isAdmin().role === "SuperAdmin"
    ) {
      return <Redirect to="/admin/dashboard" />;
    }
    return (
      <Grid className={classes.root}>
        <Box color="indigo">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Upgrade your Salons
          </Typography>
        </Box>
        <Lottie width={200} height={200} speed={4} options={defaultOptions} />
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Enjoy secret offers up to -50% off the best luxury salon services
          every Sunday.
        </Typography>
        <Button
          size="large"
          component={Link}
          to="/signup"
          className={classes.button}
        >
          Salon owner Register
        </Button>
        <Button
          size="large"
          component={Link}
          to="/login"
          className={classes.button}
        >
          Salon owner Login
        </Button>
        <Typography variant="body2" color="inherit" align="center">
          Discover the experience
        </Typography>
        <Typography variant="body2" color="inherit" align="center">
          If you are admin you can login or register as below
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={Link}
          to="/admin/signup"
          style={{ marginTop: 10 }}
          className={classes.button}
        >
          Admin Register
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={Link}
          style={{ marginTop: 10 }}
          to="/admin/login"
          className={classes.button}
        >
          Admin Login
        </Button>
      </Grid>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting Landing
export default withStyles(styles)(Landing);
