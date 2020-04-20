import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    textAlign: "center",
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
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});
class Home extends Component {
  logout() {
    console.log("LOGOUT BUTTON PRESSED");
    // this.props.history.push("Landing");
    localStorage.removeItem("x-auth-token");
    console.log("REMOVED TOKEN? ", localStorage.getItem("x-auth-token"));
    window.location = "/";
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography color="inherit" variant="h2" style={{ marginTop: 50 }}>
          This is dashboard for Salon Owner
        </Typography>

        <Button
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to="/password/change"
          className={classes.button}
        >
          Change password
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
