import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Authorization from "../common/Authorization";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
});

class Header extends React.Component {
  logOut = (e) => {
    e.preventDefault();
    console.log("before logout token = ", localStorage.getItem("x-auth-token"));
    localStorage.removeItem("x-auth-token");
    this.props.history.push(`/`);
    console.log("after logout token = ", localStorage.getItem("x-auth-token"));
  };

  render() {
    const { classes } = this.props;
    const guestLink = (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="home"
            >
              <Home />
            </IconButton>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              Salon app
            </Typography>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
    const authLink = (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="home"
            >
              <Home />
            </IconButton>
            {Authorization.isAdmin() ? (
              <Typography
                color="inherit"
                component={Link}
                to="/admin/salons"
                variant="h6"
                className={classes.title}
              >
                Home Admin
              </Typography>
            ) : (
              <Typography
                color="inherit"
                component={Link}
                to="/services"
                variant="h6"
                className={classes.title}
              >
                Home Salonwoner
              </Typography>
            )}

            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={this.logOut}
            >
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
    return (
      <div className={classes.root}>
        {localStorage.getItem("x-auth-token") ? authLink : guestLink}
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
