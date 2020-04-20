import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { Header, Footer } from "./Components/layouts/index";
import Landing from "./Components/common/Landing.jsx";

import Signup from "./Components/salonowner/auth/Signup";
import Login from "./Components/salonowner/auth/Login";
import Dashboard from "./Components/salonowner/dashboard/Dashboard";
import AdminDashboard from "./Components/admin/dashboard/AdminDashboard";
import AddServices from "./Components/salonowner/services/AddService";
import CardMaterial from "./Components/salonowner/services/ShowServices";
import CardEdit from "./Components/salonowner/services/EditService";
import AdminCardEdit from "./Components/admin/services/EditService";
import ChangePassword from "./Components/salonowner/password/UpdatePassword";
import AdminChangePassword from "./Components/admin/password/AdminChangePassword";
import Schedule from "./Components/salonowner/schedule/Schedule";
import Salons from "./Components/admin/salon/Salons";
import LoginAdmin from "./Components/admin/auth/LoginAdmin";
import SignupAdmin from "./Components/admin/auth/SignupAdmin";
import AddServiceByAdmin from "./Components/admin/services/AddService";
import AddServicesRecommended from "./Components/admin/services/AddServicesRecommended";
import ServicesViewAdmin from "./Components/admin/services/ShowServices";
import Available from "./Components/salonowner/salonAvailability/Available";
import AdminUpdateProfile from "./Components/admin/profile/AdminUpdateProfile";
import UpdateProfile from "./Components/salonowner/profile/UpdateProfile";

import {
  AdminRoute,
  SalonOwnerRoute,
} from "./Components/common/ProtectedRoute";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import NotFound from "../src/Components/common/NotFound";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    // textAlign: "center",
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    // backgroundImage: `url(${"https://picsum.photos/seed/picsum/200/300"})`,
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

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Switch>
        <Fragment>
          <Grid className={classes.root}>
            <Route render={(props) => <Header {...props} />} />
            <Route exact path="/" component={Landing} />

            <Route exact path="/signup" component={Signup} />
            <SalonOwnerRoute exact path="/calender" component={Schedule} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin/login" component={LoginAdmin} />
            <Route exact path="/admin/signup" component={SignupAdmin} />
            <SalonOwnerRoute
              exact
              path="/password/change"
              component={ChangePassword}
            />

            <AdminRoute
              exact
              path="/admin/password/change"
              component={AdminChangePassword}
            />
            <SalonOwnerRoute exact path="/dashboard" component={Dashboard} />
            <SalonOwnerRoute
              exact
              path="/services/add"
              component={AddServices}
            />
            <Route
              exact
              path="/services/edit"
              render={(props) => <CardEdit {...props} />}
            />
            <Route
              exact
              path="/admin/services/edit"
              render={(props) => <AdminCardEdit {...props} />}
            />
            <Route exact path="/admin/services" component={ServicesViewAdmin} />
            <SalonOwnerRoute exact path="/available" component={Available} />
            <SalonOwnerRoute exact path="/services" component={CardMaterial} />
            <Route
              exact
              path="/admin/services/add"
              component={AddServiceByAdmin}
            />
            <Route
              exact
              path="/owner/services/add"
              component={AddServicesRecommended}
            />
            <AdminRoute exact path="/admin/salons" component={Salons} />
            <AdminRoute
              exact
              path="/admin/profile/edit"
              component={AdminUpdateProfile}
            />
            <SalonOwnerRoute
              exact
              path="/profile/edit"
              component={UpdateProfile}
            />

            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <ToastsContainer
              position={ToastsContainerPosition.TOP_CENTER}
              store={ToastsStore}
            />
            {/* <Route exact path="*" component={NotFound} /> */}
            <Footer />
          </Grid>
        </Fragment>
      </Switch>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
