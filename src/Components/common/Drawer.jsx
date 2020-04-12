import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LockIcon from "@material-ui/icons/Lock";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import EcoIcon from "@material-ui/icons/Eco";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";

import decode from "jwt-decode";
const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }
  componentDidMount() {}
  toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ [side]: open });
  };

  sideListAdmin = (side) => (
    <div
      //   className={classes.list}

      // style={{ width: 300, flexShrink: 0 }}
      variant="permanent"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <CssBaseline />

      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/dashboard" variant="h6">
            Dashboard
          </Button>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/salons" variant="h6">
            Salons
          </Button>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/admin/services/add"
            variant="h6"
          >
            Admin Add Services
          </Button>
        </ListItem>
      </List>
    </div>
  );

  sideListSalonOwner = (side) => (
    <div
      //   className={classes.list}

      style={{ width: 300, flexShrink: 0 }}
      //   variant="permanent"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <CssBaseline />

      <List>
        <ListItem>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/services" variant="h6">
            Services
          </Button>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/available" variant="h6">
            Availability
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/services/add"
            variant="h6"
          >
            Add services
          </Button>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/dashboard" variant="h6">
            Dashboard
          </Button>
        </ListItem>
      </List>
    </div>
  );

  render() {
    console.log("token in drawer", localStorage.getItem("x-auth-token"));
    const decoded = decode(localStorage.getItem("x-auth-token"));
    const isAdmin = decoded.SuperAdmin;
    console.log(isAdmin);

    return (
      <div>
        {/* {localStorage.getItem("x-auth-token") ? ( */}
        <MenuIcon
          style={{ marginLeft: 20, marginTop: 10 }}
          onClick={this.toggleDrawer("left", true)}
        />
        {/* ) : null} */}

        {/* <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer> */}

        <Drawer
          variant="temporary"
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {isAdmin
            ? this.sideListAdmin("left")
            : this.sideListSalonOwner("left")}
        </Drawer>
      </div>
    );
  }
}
