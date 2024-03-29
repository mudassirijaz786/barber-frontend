//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { ToastsStore } from "react-toasts";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  CssBaseline,
  LinearProgress,
} from "@material-ui/core";
import { url } from "../../../../src/config.json";

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

//class AdminLogin
class AdminLogin extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    error: {},
    loading: false,
  };

  validate = () => {
    const { account } = this.state;
    const { error } = Joi.validate(account, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validate_single = (field_name) => {
    const { error } = Joi.validate(
      this.state.account[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  };

  handleSubmit = async () => {
    const error = this.validate();
    const { account } = this.state;
    this.setState({ error: error || {}, loading: true });
    await axios
      .post(url + "/login/superadmin", {
        email: account.email,
        password: account.password,
      })
      .then((response) => {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        this.props.history.push("/admin/salons");
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Error while logging in");
        }
      });
    this.setState({ loading: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const account = { ...this.state.account };
    account[name] = value;
    this.setState({ account });
    const error = this.validate_single(name);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });
    if (error) return;
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
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
  };

  render() {
    const { classes } = this.props;
    const { account, error, loading } = this.state;
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
                Login
              </Typography>
            </Box>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Please login as an admin
            </Typography>
            <TextField
              label="email"
              variant="outlined"
              placeholder="Please enter your email"
              value={account.email}
              className={classes.fields}
              onChange={this.handleChange}
              fullWidth
              error={error.email}
              helperText={error.email}
              name="email"
            />
            <TextField
              fullWidth
              value={account.password}
              onChange={this.handleChange}
              className={classes.fields}
              name="password"
              label="password"
              type="password"
              variant="outlined"
              placeholder="Please enter your password"
              error={error.password}
              helperText={error.password}
            />
            <Button
              fullWidth
              className={classes.button}
              variant="contained"
              disabled={this.validate()}
              onClick={this.handleSubmit}
            >
              Admin Login
            </Button>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting AdminLogin
export default withStyles(styles)(AdminLogin);
