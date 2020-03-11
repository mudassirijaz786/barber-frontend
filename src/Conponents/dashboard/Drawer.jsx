import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
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
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      //   className={classes.list}

      style={{ width: 300, flexShrink: 0 }}
      //   variant="permanent"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <Typography
            color="primary"
            component={Link}
            to="/services"
            variant="h6"
          >
            Services
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <Typography
            color="primary"
            component={Link}
            to="/schedule"
            variant="h6"
          >
            Schedule
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <Typography
            color="primary"
            component={Link}
            to="/viewschedule"
            variant="h6"
          >
            View Schedule
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Typography
            color="primary"
            component={Link}
            to="/dashboard"
            variant="h6"
          >
            Dashboard
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <Typography color="primary" component={Link} to="/login" variant="h6">
            Login
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <Typography
            color="primary"
            component={Link}
            to="/signup"
            variant="h6"
          >
            Signup
          </Typography>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <Typography color="primary" component={Link} to="/" variant="h6">
            Logout
          </Typography>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {/* {localStorage.getItem("x-auth-token") ? ( */}
      <MenuIcon
        style={{ marginLeft: 20, marginTop: 10 }}
        onClick={toggleDrawer("left", true)}
      />
      {/* ) : null} */}

      {/* <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer> */}

      <Drawer
        variant="temporary"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
}
