//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import {
  LinearProgress,
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

//styling
const styles = {
  button: {
    background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  fields: {
    marginTop: 15,
  },
};

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

//class AdminChangePassword
class AdminChangePassword extends Component {
  state = {
    Admin: {
      password: "password1122",
      newPassword: "dasdasd",
      confirmNewPassword: "dasdasds",
    },
    error: {},
    loading: false,
  };

  schema = {
    password: Joi.string().required().min(8).max(15).label("password"),
    newPassword: Joi.string().required().min(8).max(15).label("newPassword"),
    confirmNewPassword: Joi.any()
      .required()
      .valid(Joi.ref("newPassword"))
      .options({ language: { any: { allowOnly: "passwords must match" } } }),
  };

  validate = () => {
    const { Admin } = this.state;
    const { error } = Joi.validate(Admin, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    return errors;
  };

  validate_single = (field_name) => {
    const { error } = Joi.validate(
      this.state.Admin[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  };

  handleSubmit = async () => {
    const { Admin } = this.state;
    const error = this.validate();
    this.setState({ error: error || {}, loading: true });
    let form_data = new FormData();
    form_data.append("oldpassword", Admin.password);
    form_data.append("confirmpassword", Admin.newPassword);
    var token = localStorage.getItem("x-auth-token");
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin/change/password/",
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        ToastsStore.success("Password has successfully changed by admin", 5000);
        this.setState({ loading: false });
        setTimeout(() => {
          window.location = "/admin/dashboard";
        }, 5000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);
          this.setState({
            loading: false,
          });
        }
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const Admin = { ...this.state.Admin };
    Admin[name] = value;
    this.setState({ Admin });
    const error = this.validate_single(name);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });
    if (error) return;
  };

  render() {
    const { classes } = this.props;
    const { loading, Admin, error } = this.state;
    return (
      <React.Fragment>
        <div> {loading && <ColorLinearProgress size={30} />}</div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Password update
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please update your password as an admin
          </Typography>
          <TextField
            error={error.password}
            placeholder="Please enter your password"
            value={Admin.password}
            onChange={this.handleChange}
            name="password"
            label="password"
            className={classes.fields}
            fullWidth
            variant="outlined"
            helperText={error.password}
          />
          <TextField
            variant="outlined"
            error={error.newPassword}
            value={Admin.newPassword}
            onChange={this.handleChange}
            label="newPassword"
            fullWidth
            className={classes.fields}
            name="newPassword"
            placeholder="Please enter your new password"
            helperText={error.newPassword}
          />
          <TextField
            error={error.confirmNewPassword}
            value={Admin.confirmNewPassword}
            onChange={this.handleChange}
            name="confirmNewPassword"
            placeholder="Please enter your confirm new password"
            variant="outlined"
            className={classes.fields}
            fullWidth
            label="confirmNewPassword"
            helperText={error.confirmNewPassword}
          />
          <Button
            variant="contained"
            color="primary"
            className={[classes.fields, classes.button]}
            fullWidth
            disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            Update password
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

AdminChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting
export default withStyles(styles)(AdminChangePassword);
