import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Header, Footer } from "./Components/layouts/index";
import Landing from "./Components/common/Landing.jsx";
import Signup from "./Components/salonowner/auth/Signup";
import Login from "./Components/salonowner/auth/Login";
import Dashboard from "./Components/salonowner/dashboard/Dashboard";
import AdminDashboard from "./Components/admin/dashboard/AdminDashboard";
import AddServices from "./Components/salonowner/services/AddService";
import CardMaterial from "./Components/salonowner/services/ShowServices";
import CardEdit from "./Components/salonowner/services/EditService";
import changePassword from "./Components/salonowner/auth/changePassword";
import AuthHeader from "./Components/layouts/AuthenticationHeader";
import calender from "./Components/salonowner/schedule/Schedule";
import Salons from "./Components/admin/salon/Salons";
import LoginAdmin from "./Components/admin/auth/LoginAdmin";
import SignupAdmin from "./Components/admin/auth/SignupAdmin";
import AddServiceByAdmin from "./Components/admin/services/AddServiceByAdmin";
import AddServicesRecommended from "./Components/admin/services/AddServicesRecommended";
import ServicesViewAdmin from "./Components/admin/services/ServicesViewAdmin";
import Available from "./Components/salonowner/salonAvailability/Available";
import UpdateProfile from "./Components/admin/profile/UpdateProfile";
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

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Fragment>
          <Route render={(props) => <Header {...props} />} />
          <Route exact path="/calender" component={AuthHeader} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <SalonOwnerRoute exact path="/calender" component={calender} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/login" component={LoginAdmin} />
          <Route exact path="/admin/signup" component={SignupAdmin} />
          <SalonOwnerRoute
            exact
            path="/password/change"
            component={changePassword}
          />
          <SalonOwnerRoute exact path="/dashboard" component={Dashboard} />
          <SalonOwnerRoute exact path="/services/add" component={AddServices} />
          <Route
            exact
            path="/services/edit"
            render={(props) => <CardEdit {...props} />}
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
          <Route exact path="/admin/salons" component={AuthHeader} />
          <AdminRoute exact path="/admin/salons" component={Salons} />
          <AdminRoute
            exact
            path="/admin/profile/edit"
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
        </Fragment>
      </Switch>
    );
  }
}

export default App;
