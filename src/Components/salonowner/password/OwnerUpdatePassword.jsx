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

//class OwnerUpdatePassword
class OwnerUpdatePassword extends Component {
  state = {
    SalonOwner: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    error: {},
    loading: false,
  };

  schema = {
    password: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        };
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .label("password"),
    newPassword: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        };
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .label("new password"),
    confirmNewPassword: Joi.any()
      .required()
      .valid(Joi.ref("newPassword"))
      .error(() => {
        return {
          message: "Passwords must match",
        };
      }),
  };

  validate = () => {
    const { SalonOwner } = this.state;
    const { error } = Joi.validate(SalonOwner, this.schema, {
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
      this.state.SalonOwner[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  };

  handleSubmit = async () => {
    const { SalonOwner } = this.state;
    const error = this.validate();
    this.setState({ error: error || {}, loading: true });
    let form_data = new FormData();
    form_data.append("oldpassword", SalonOwner.password);
    form_data.append("confirmpassword", SalonOwner.newPassword);
    var token = localStorage.getItem("x-auth-token");
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp/change/password",
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        ToastsStore.success(
          "Password has successfully changed by salon owner",
          2000
        );
        this.setState({ loading: false });
        setTimeout(() => {
          window.location = "/services";
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Password cannot be updated");
          this.setState({
            loading: false,
          });
        }
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const SalonOwner = { ...this.state.SalonOwner };
    SalonOwner[name] = value;
    this.setState({ SalonOwner });
    const error = this.validate_single(name);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });
    if (error) return;
  };

  render() {
    const { classes } = this.props;
    const { loading, SalonOwner, error } = this.state;
    return (
      <React.Fragment>
        <div> {loading && <ColorLinearProgress size={30} />}</div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography variant="h3" align="center">
              Password update
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please update your password as a salon owner
          </Typography>
          <TextField
            placeholder="Please enter your password"
            value={SalonOwner.password}
            onChange={this.handleChange}
            name="password"
            error={error.password}
            helperText={error.password}
            label="password"
            type="password"
            className={classes.fields}
            fullWidth
            variant="outlined"
          />
          <TextField
            variant="outlined"
            value={SalonOwner.newPassword}
            onChange={this.handleChange}
            label="newPassword"
            fullWidth
            className={classes.fields}
            error={error.newPassword}
            helperText={error.newPassword}
            name="newPassword"
            type="password"
            placeholder="Please enter your newPassword"
          />
          <TextField
            value={SalonOwner.confirmNewPassword}
            onChange={this.handleChange}
            name="confirmNewPassword"
            placeholder="Please enter your confirmNewPassword"
            variant="outlined"
            error={error.confirmNewPassword}
            helperText={error.confirmNewPassword}
            className={classes.fields}
            fullWidth
            label="confirmNewPassword"
            type="password"
          />
          <Button
            fullWidth
            className={classes.button}
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
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

OwnerUpdatePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerUpdatePassword
export default withStyles(styles)(OwnerUpdatePassword);
