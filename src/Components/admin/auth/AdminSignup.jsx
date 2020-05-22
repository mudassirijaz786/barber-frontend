//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  LinearProgress,
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
    marginTop: 15,
    padding: "0 30px",
  },
  fields: {
    marginTop: 15,
  },
};

//progress bar
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

//class SignupAdmin
class SignupAdmin extends Component {
  state = {
    Admin: {
      email: "",
      password: "",
      name: "",
      phonenumber: "",
    },
    error: {},
    loading: false,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        };
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .label("Password"),
    phonenumber: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Must be a valid phone number",
        };
      })
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .label("Phonenumber"),
    name: Joi.string().required().min(3).max(10).label("Name"),
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
    const error = this.validate();
    const { Admin } = this.state;
    this.setState({ error: error || {}, loading: true });
    axios
      .post(
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin",
        {
          name: Admin.name,
          email: Admin.email,
          password: Admin.password,
          phonenumber: Admin.phonenumber,
        }
      )
      .then((response) => {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        ToastsStore.success(
          "You have registered successfully as an admin",
          30000
        );
        this.setState({ loading: false });
        setTimeout(() => {
          window.location = "/admin/login";
        }, 30000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Error occured while registration");
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
    const { Admin, error, loading } = this.state;
    return (
      <React.Fragment>
        <div> {loading && <ColorLinearProgress size={30} />}</div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Container maxWidth="sm">
            <Box color="indigo">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                gutterBottom
              >
                Signup
              </Typography>
            </Box>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Please signup as an admin
            </Typography>
            <TextField
              placeholder="Please enter your email"
              value={Admin.email}
              error={error.email}
              helperText={error.email}
              onChange={this.handleChange}
              name="email"
              label="email"
              className={classes.fields}
              fullWidth
              variant="outlined"
            />
            <TextField
              variant="outlined"
              error={error.password}
              helperText={error.password}
              placeholder="Please enter your password"
              value={Admin.password}
              type="password"
              onChange={this.handleChange}
              label="password"
              fullWidth
              className={classes.fields}
              name="password"
            />
            <TextField
              variant="outlined"
              value={Admin.name}
              error={error.name}
              helperText={error.name}
              onChange={this.handleChange}
              label=" name"
              fullWidth
              className={classes.fields}
              name="name"
              placeholder="Please enter your name"
            />
            <TextField
              value={Admin.phonenumber}
              onChange={this.handleChange}
              error={error.phonenumber}
              helperText={error.phonenumber}
              name="phonenumber"
              placeholder="Please enter your phone number"
              variant="outlined"
              className={classes.fields}
              fullWidth
              label="phone number"
            />
            <Button
              fullWidth
              className={classes.button}
              variant="contained"
              disabled={this.validate()}
              onClick={this.handleSubmit}
            >
              Admin Signup
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

SignupAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting SignupAdmin
export default withStyles(styles)(SignupAdmin);
