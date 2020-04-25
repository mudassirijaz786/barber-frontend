//importing
import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Authorization from "../common/Authorization";
import AppDrawer from "../common/Drawer";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { Button, Typography, Toolbar, AppBar } from "@material-ui/core";

//styling
const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 2,
    textAlign: "left",
  },
};

//class Header
class Header extends React.Component {
  logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("x-auth-token");
    window.location = "/";
  };

  render() {
    const { classes } = this.props;
    const guestLink = (
      <div className={classes.root}>
        <AppBar position="relative" color="inherit">
          <Toolbar>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              className={classes.title}
            >
              Salon App
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
        <AppBar position="relative" color="inherit">
          <Toolbar>
            {Authorization.isAdmin() || Authorization.isSalonOnwer() ? (
              <AppDrawer />
            ) : null}
            <Typography color="inherit" variant="h6" className={classes.title}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                style={{ float: "right" }}
                onClick={this.logOut}
              >
                <ExitToAppIcon />
              </Button>
            </Typography>
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
