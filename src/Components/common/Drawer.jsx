//importing
import React from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import {
  Menu as MenuIcon,
  Edit as EditIcon,
  VpnKey as VpnKeyIcon,
  AddBox as AddBoxIcon,
  Eco as EcoIcon,
  ViewList as ViewListIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  WatchLater as WatchLaterIcon,
} from "@material-ui/icons";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  List,
  CssBaseline,
  Button,
} from "@material-ui/core";

//class AppDrawer
export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }

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
      variant="permanent"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <CssBaseline />
      <List>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/salons">
            Salons
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/services/add">
            Add Services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/services">
            view Services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/profile/edit">
            Update profile
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/password/change">
            Change password
          </Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Dashboard
          </Button>
        </ListItem>
      </List>
    </div>
  );

  sideListSalonOwner = (side) => (
    <div
      variant="permanent"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <CssBaseline />
      <List>
        <ListItem>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <Button component={Link} to="/services" color="inherit">
            view services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/recommended">
            Add services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <Button component={Link} to="/available" color="inherit">
            Availability
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <Button component={Link} to="/calender" color="inherit">
            Schedule
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/profile/edit">
            Update profile
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/password/change">
            Change password
          </Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        </ListItem>
      </List>
    </div>
  );

  render() {
    const decoded = decode(localStorage.getItem("x-auth-token"));
    const isAdmin = decoded.SuperAdmin;
    return (
      <div>
        <MenuIcon
          style={{ marginLeft: 20, marginTop: 10 }}
          onClick={this.toggleDrawer("left", true)}
        />
        <Drawer
          variant="temporary"
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          ModalProps={{
            keepMounted: true,
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
