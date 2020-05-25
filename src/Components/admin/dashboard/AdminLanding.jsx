//importing
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Typography, Grid, Button, Box, withStyles } from "@material-ui/core";
import Authorization from "../../common/Authorization";

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

//class AdminLanding
class AdminLanding extends React.Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const secret = "secret";
    let message = prompt("Type secret here");
    if (message !== secret) {
      return <Redirect to="/" />;
    }
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
            Page for admin use
          </Typography>
        </Box>
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

AdminLanding.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting AdminLanding
export default withStyles(styles)(AdminLanding);
