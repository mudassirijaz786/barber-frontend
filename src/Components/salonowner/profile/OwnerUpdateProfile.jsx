//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import TimePicker from "react-time-picker";
import {
  CssBaseline,
  Container,
  LinearProgress,
  Box,
  Typography,
  Paper,
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
  paper: {
    justifyContent: "center",
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    marginTop: 15,
  },
  timing: {
    color: "green",
    marginRight: 15,
  },
  timingSpan: {
    padding: 10,
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

//class OwnerUpdateProfile
class OwnerUpdateProfile extends Component {
  state = {
    Salon: {
      Salon_owner_email: "",
      Salon_owner_cnic: "",
      Salon_owner_phoneNumber: "",
      Salon_owner_firstName: "",
    },
    Salon_opening_hours: "",
    Salon_closing_hours: "",
    error: {},
    isLoading: false,
  };

  componentDidMount() {
    const url =
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp/getSingle";
    axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        const { Salon } = this.state.Salon;
        Salon.Salon_owner_firstName = response.data.Salon_owner_firstName;
        Salon.Salon_owner_email = response.data.SalonOwnerEmail;
        Salon.Salon_owner_phoneNumber = response.data.SalonOwnerphoneNumber;
        Salon.Salon_owner_cnic = response.data.SalonOwnerCnic;
        this.setState({
          Salon,
          Salon_opening_hours: response.data.Salon_opening_hours,
          Salon_closing_hours: response.data.Salon_closing_hours,
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  schema = {
    Salon_owner_email: Joi.string().email().required().label("Email"),
    Salon_owner_cnic: Joi.string()
      .required()
      .error(() => {
        return {
          message:
            "Must be a valid cnic e.g. XXXXX-XXXXXXX-X or without hyphon",
        };
      })
      .regex(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)
      .label("Cnic"),
    Salon_owner_phoneNumber: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Must be a valid phone number",
        };
      })
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .label("Phonenumber"),
    Salon_owner_firstName: Joi.string().min(3).max(10).label("FirstName"),
  };

  validate = () => {
    const { Salon } = this.state;
    const { error } = Joi.validate(Salon, this.schema, {
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
      this.state.Salon[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  };

  handleSubmit = async () => {
    const { Salon, Salon_opening_hours, Salon_closing_hours } = this.state;
    let form_data = new FormData();
    form_data.append("name", Salon.Salon_owner_firstName);
    form_data.append("email", Salon.Salon_owner_email);
    form_data.append("phoneNumber", Salon.Salon_owner_phoneNumber);
    form_data.append("cnic", Salon.Salon_owner_cnic);
    form_data.append("Salon_opening_hours", Salon_opening_hours);
    form_data.append("Salon_closing_hours", Salon_closing_hours);
    console.log("form data", form_data);
    const error = this.validate();
    this.setState({ error: error || {}, isLoading: true });
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        ToastsStore.success("Updated profile successfully as an admin", 2000);
        setTimeout(() => {
          window.location = "/services";
        }, 2000);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Profile cannot be updated");
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  handle_opening_time_change = (time) => {
    this.setState({ Salon_opening_hours: time });
  };

  handle_closing_time_change = (time) => {
    this.setState({ Salon_closing_hours: time });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const Salon = { ...this.state.Salon };
    Salon[name] = value;
    this.setState({ Salon });
    const error = this.validate_single(name);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });
    if (error) return;
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      Salon,
      Salon_opening_hours,
      Salon_closing_hours,
      error,
    } = this.state;
    return (
      <React.Fragment>
        <div>{isLoading && <ColorLinearProgress size={30} />}</div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Update profile
            </Typography>
          </Box>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please update profile as a salon owner
          </Typography>
          <TextField
            placeholder="Please enter your email"
            value={this.state.Salon.Salon_owner_email}
            onChange={this.handleChange}
            name="Salon_owner_email"
            label="email"
            error={error.Salon_owner_email}
            helperText={error.Salon_owner_email}
            className={classes.fields}
            fullWidth
            variant="outlined"
          />
          <TextField
            variant="outlined"
            className={classes.fields}
            value={this.state.Salon.Salon_owner_firstName}
            onChange={this.handleChange}
            label="first name"
            fullWidth
            error={error.Salon_owner_firstName}
            helperText={error.Salon_owner_firstName}
            name="Salon_owner_firstName"
            placeholder="Please enter your firstname"
          />
          <TextField
            className={classes.fields}
            value={this.state.Salon.Salon_owner_cnic}
            onChange={this.handleChange}
            name="Salon_owner_cnic"
            label="cnic"
            error={error.Salon_owner_cnic}
            helperText={error.Salon_owner_cnic}
            fullWidth
            placeholder="Please enter your cnic"
            variant="outlined"
          />
          <TextField
            className={classes.fields}
            value={Salon.Salon_owner_phoneNumber}
            onChange={this.handleChange}
            name="Salon_owner_phoneNumber"
            placeholder="Please enter your phone number"
            variant="outlined"
            fullWidth
            error={error.Salon_owner_phoneNumber}
            helperText={error.Salon_owner_phoneNumber}
            label="phone number"
          />
          <Paper elevation={8} className={classes.paper}>
            <span className={classes.timingSpan}>
              <Typography className={classes.timing}>Starting time</Typography>
              <TimePicker
                label="select starting time"
                onChange={this.handle_opening_time_change}
                value={Salon_opening_hours}
                isOpen={false}
                clearIcon="Clear"
                clockAriaLabel="Toggle clock"
                clockIcon=""
                required={true}
              />
            </span>
            <span className={classes.timingSpan}>
              <Typography className={classes.timing}>Closing time</Typography>
              <TimePicker
                onChange={this.handle_closing_time_change}
                value={Salon_closing_hours}
                isOpen={false}
                clearIcon="Clear"
                clockAriaLabel="Toggle clock"
                clockIcon=""
                required={true}
              />
            </span>
          </Paper>
          <Button
            fullWidth
            className={classes.button}
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            update profile
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}
OwnerUpdateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerUpdateProfile
export default withStyles(styles)(OwnerUpdateProfile);
