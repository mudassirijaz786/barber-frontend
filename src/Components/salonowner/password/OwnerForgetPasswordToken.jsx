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

//class OwnerForgetPasswordToken
class OwnerForgetPasswordToken extends Component {
  state = {
    SalonOwner: {
      email: "",
    },
    error: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label("email"),
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
    let obj = {};
    obj["email"] = SalonOwner.email;
    await axios
      .post(url + "/SalonSignUp/forgot/password", {
        email: obj.email,
      })
      .then((response) => {
        if (response.status === 200) {
          ToastsStore.success("Check your email for token");
          this.setState({
            loading: false,
          });
        }
        window.location = "/reset/password";
        this.setState({
          loading: false,
        });
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
              Forget your password?
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please reset your password as a salon owner
          </Typography>
          <TextField
            label="email"
            variant="outlined"
            placeholder="Please enter your email"
            value={SalonOwner.email}
            className={classes.fields}
            onChange={this.handleChange}
            fullWidth
            error={error.email}
            helperText={error.email}
            name="email"
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
            Get token
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

OwnerForgetPasswordToken.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerUpdatePassword
export default withStyles(styles)(OwnerForgetPasswordToken);
