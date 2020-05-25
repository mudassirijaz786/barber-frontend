//importing
import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { Header, Footer } from "./Components/layouts/index";
import Landing from "./Components/common/Landing.jsx";
import OwnerUpdateService from "./Components/salonowner/services/OwnerUpdateService";
import OwnerViewRecommendedService from "./Components/salonowner/services/OwnerViewRecommendedService";
import OwnerSignup from "./Components/salonowner/auth/OwnerSignup";
import OwnerLogin from "./Components/salonowner/auth/OwnerLogin";
import OwnerDashboard from "./Components/salonowner/dashboard/OwnerDashboard";
import AdminDashboard from "./Components/admin/dashboard/AdminDashboard";
import OwnerAddService from "./Components/salonowner/services/OwnerAddService";
import OwnerViewServices from "./Components/salonowner/services/OwnerViewServices";
import OwnerAddRecommendedService from "./Components/salonowner/services/OwnerAddRecommendedService";
import AdminEditService from "./Components/admin/services/AdminEditService";
import OwnerUpdatePassword from "./Components/salonowner/password/OwnerUpdatePassword";
import AdminChangePassword from "./Components/admin/password/AdminChangePassword";
import Schedule from "./Components/salonowner/schedule/Schedule";
import Salons from "./Components/admin/salon/Salons";
import AdminLogin from "./Components/admin/auth/AdminLogin";
import SignupAdmin from "./Components/admin/auth/AdminSignup";
import AddServiceByAdmin from "./Components/admin/services/AdminAddService";
import AdminViewServices from "./Components/admin/services/AdminViewServices";
import SalonAvailability from "./Components/salonowner/salonAvailability/SalonAvailability";
import AdminProfileUpdate from "./Components/admin/profile/AdminProfileUpdate";
import OwnerUpdateProfile from "./Components/salonowner/profile/OwnerUpdateProfile";
import OwnerForgetPasswordToken from "./Components/salonowner/password/OwnerForgetPasswordToken";
import OwnerResetPassword from "./Components/salonowner/password/OwnerResetPassword";
import AdminLanding from "./Components/admin/dashboard/AdminLanding";
import {
  AdminRoute,
  SalonOwnerRoute,
} from "./Components/common/ProtectedRoute";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

//styling
const styles = {
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
  root: {
    width: "100%",
    background: "linear-gradient(to right, #ffefba, #ffffff)",
  },
};

//class App
class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Switch>
        <Grid className={classes.root}>
          <Route render={(props) => <Header {...props} />} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={OwnerSignup} />
          <Route exact path="/login" component={OwnerLogin} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/signup" component={SignupAdmin} />
          <Route
            exact
            path="/services/edit"
            render={(props) => <OwnerAddRecommendedService {...props} />}
          />
          <Route exact path="/secret/admin" component={AdminLanding} />
          <Route
            exact
            path="/services/update"
            render={(props) => <OwnerUpdateService {...props} />}
          />
          <Route
            exact
            path="/forget/password"
            component={OwnerForgetPasswordToken}
          />
          <Route exact path="/reset/password" component={OwnerResetPassword} />
          <Route
            exact
            path="/admin/services/add"
            component={AddServiceByAdmin}
          />
          <Route
            exact
            path="/admin/services/edit"
            render={(props) => <AdminEditService {...props} />}
          />
          <SalonOwnerRoute exact path="/calender" component={Schedule} />
          <SalonOwnerRoute exact path="/dashboard" component={OwnerDashboard} />
          <SalonOwnerRoute
            exact
            path="/available"
            component={SalonAvailability}
          />
          <SalonOwnerRoute
            exact
            path="/recommended"
            component={OwnerViewRecommendedService}
          />
          <SalonOwnerRoute
            exact
            path="/services"
            component={OwnerViewServices}
          />
          <SalonOwnerRoute
            exact
            path="/profile/edit"
            component={OwnerUpdateProfile}
          />
          <SalonOwnerRoute
            exact
            path="/services/add"
            component={OwnerAddService}
          />
          <SalonOwnerRoute
            exact
            path="/password/change"
            component={OwnerUpdatePassword}
          />
          <AdminRoute exact path="/admin/salons" component={Salons} />
          <AdminRoute
            exact
            path="/admin/password/change"
            component={AdminChangePassword}
          />
          <AdminRoute
            exact
            path="/admin/services"
            component={AdminViewServices}
          />
          <AdminRoute
            exact
            path="/admin/profile/edit"
            component={AdminProfileUpdate}
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
          <Footer />
        </Grid>
      </Switch>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting App
export default withStyles(styles)(App);
