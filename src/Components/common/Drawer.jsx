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
          <Button
            color="primary"
            component={Link}
            to="/admin/salons"
            variant="h6"
          >
            Salons
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/admin/services/add"
            variant="h6"
          >
            Add Services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/admin/services"
            variant="h6"
          >
            view Services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/admin/profile/edit"
            variant="h6"
          >
            Update profile
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/admin/password/change"
            variant="h6"
          >
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
          <Button
            color="primary"
            component={Link}
            to="/admin/dashboard"
            variant="h6"
          >
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
          <Button color="primary" component={Link} to="/services" variant="h6">
            view services
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/recommended"
            variant="h6"
          >
            Add services
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
            <EcoIcon />
          </ListItemIcon>
          <Button color="primary" component={Link} to="/calender" variant="h6">
            Schedule
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/profile/edit"
            variant="h6"
          >
            Update profile
          </Button>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <Button
            color="primary"
            component={Link}
            to="/password/change"
            variant="h6"
          >
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
          <Button color="primary" component={Link} to="/dashboard" variant="h6">
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
