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

//class OwnerResetPassword
class OwnerResetPassword extends Component {
  state = {
    SalonOwner: {
      token: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    error: {},
    loading: false,
  };

  schema = {
    token: Joi.string()
      .required()
      .regex(/^[0-9]{5}$/)
      .error(() => {
        return {
          message: "Token must be 5 digits",
        };
      })
      .label("token"),
    newPassword: Joi.string()
      .error(() => {
        return {
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        };
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
    confirmNewPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .error(() => {
        return {
          message: "Password must matches",
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
    let obj = {};
    obj["token"] = SalonOwner.token;
    obj["confirmpassword"] = SalonOwner.newPassword;
    await axios
      .post(url + "/SalonSignUp/verify_code/and/update_password", {
        token: obj.token,
        confirmpassword: obj.confirmpassword,
      })
      .then((response) => {
        this.setState({
          loading: false,
        });
        ToastsStore.success("password is updated successfully");
        this.setState({
          loading: false,
        });
        window.location = "/login";
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Invalid token");
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
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Reset your password
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please Reset your password as a salon owner
          </Typography>
          <TextField
            placeholder="Enter the token emailed to u"
            value={SalonOwner.token}
            onChange={this.handleChange}
            name="token"
            error={error.token}
            helperText={error.token}
            label="token"
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
            type="password"
            error={error.confirmNewPassword}
            helperText={error.confirmNewPassword}
            className={classes.fields}
            fullWidth
            label="confirmNewPassword"
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
            Reset password
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

OwnerResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerResetPassword
export default withStyles(styles)(OwnerResetPassword);
