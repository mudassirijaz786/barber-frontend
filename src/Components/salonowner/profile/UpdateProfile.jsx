import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ToastsStore } from "react-toasts";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ProgressSpinner } from "primereact/progressspinner";

import TimePicker from "react-time-picker";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  control: {
    padding: 10,
  },
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
  paper: {
    display: "flex",
    flexWrap: "wrap",
  },
  error: {
    color: "red",
  },
});
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);
class Sign_Up extends Component {
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
        const Salon = this.state.Salon;

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

      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  schema = {
    Salon_owner_email: Joi.string().email().required().label("Email"),
    Salon_owner_cnic: Joi.number()
      .required()
      .min(10)
      //.max(17)
      .label("Cnic"),
    Salon_owner_phoneNumber: Joi.number()
      .required()
      .min(11)
      //.max(13)
      .label("Phonenumber"),
    Salon_owner_firstName: Joi.string().min(3).max(10).label("FirstName"),
  };
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate_single = this.validate_single.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChangessalonserach = (Salon_Name) => {
    const Salon = { ...this.state.Salon };

    Salon["Salon_Name"] = Salon_Name;
    this.setState({ Salon });
  };
  handleSelect = (Salon_Name) => {
    const Salon = { ...this.state.Salon };

    Salon["Salon_Name"] = Salon_Name;
    this.setState({ Salon });

    geocodeByAddress(Salon_Name)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({
          latLng,
        });
      })

      .catch((error) => console.error("Error", error));
  };

  validate() {
    //console.log("validate funcctions is called");
    const { error } = Joi.validate(this.state.Salon, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};

    error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    return errors;
  }

  validate_single(field_name) {
    //console.log(this.state.Salon);
    //	console.log(this.state.Salon[field_name]);
    //console.log(field_name);
    //	console.log(this.schema[field_name]);
    const { error } = Joi.validate(
      this.state.Salon[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;

    //	const errors = {};
    //errors[field_name]=error.details.message
  }

  async handleSubmit(e) {
    //		console.log("state is ", this.state);
    let form_data = new FormData();
    form_data.append("name", this.state.Salon.Salon_owner_firstName);
    form_data.append("email", this.state.Salon.Salon_owner_email);
    form_data.append("phoneNumber", this.state.Salon.Salon_owner_phoneNumber);
    form_data.append("cnic", this.state.Salon.Salon_owner_cnic);

    form_data.append("Salon_opening_hours", this.state.Salon_opening_hours);

    form_data.append("Salon_closing_hours", this.state.Salon_closing_hours);
    console.log("form data", form_data);
    const error = this.validate();
    this.setState({ error: error || {}, isLoading: true });
    //const port=5000
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",

      // url:
      // 	"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        ToastsStore.success("Updated successfully", 3000);
        this.setState({ isLoading: false });
        // const Salon = this.state.Salon;
        // Salon.Salon_owner_firstName = response.data.Salon_owner_firstName;
        // Salon.Salon_owner_email = response.data.SalonOwnerEmail;
        // Salon.Salon_owner_phoneNumber = response.data.SalonOwnerphoneNumber;
        // Salon.Salon_owner_cnic = response.data.SalonOwnerCnic;

        // this.setState({
        // 	Salon,
        // 	Salon_opening_hours: response.data.Salon_opening_hours,
        // 	Salon_closing_hours: response.data.Salon_closing_hours,
        // });

        // setTimeout(() => {
        // 	window.location = "/dashboard";
        // }, 5000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);
          this.setState({
            backendError: error.response.data,
            isLoading: false,
          });
          // alert(error.response.data);
        }
      });

    //	const result = await axios.post(url, this.state.Salon);
    //	console.log(result);
  }

  handle_opening_time_change = (time) => {
    this.setState({ Salon_opening_hours: time });
  };

  handle_closing_time_change = (time) => {
    this.setState({ Salon_closing_hours: time });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.type);
    //console.log(e.currentTarget.name);
    const Salon = { ...this.state.Salon };
    //console.log(Salon);
    Salon[name] = value;
    this.setState({ Salon });
    const error = this.validate_single(name);
    //console.log(error);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });

    //	this.setState({ error, [e.currentTarget.name]: error.message });
    //console.log(error.Salon_owner_email);
    //	this.setState({ onj: oj });
    if (error) return;
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div>{this.state.isLoading && <ColorLinearProgress size={30} />}</div>

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

          <Typography
            style={{ color: "red", textAlign: "center" }}
            variant="h5"
          >
            {this.state.backendError}
          </Typography>

          <TextField
            placeholder="Please enter your email"
            value={this.state.Salon.Salon_owner_email}
            onChange={this.handleChange}
            name="Salon_owner_email"
            label="email"
            className={classes.fields}
            fullWidth
            variant="outlined"
          />
          <div style={{ color: "red" }}>
            {this.state.error.Salon_owner_email}
          </div>

          <TextField
            variant="outlined"
            className={classes.fields}
            value={this.state.Salon.Salon_owner_firstName}
            onChange={this.handleChange}
            label="first name"
            fullWidth
            name="Salon_owner_firstName"
            placeholder="Please enter your firstname"
          />
          <div>{this.state.error.Salon_owner_firstName}</div>

          <TextField
            className={classes.fields}
            value={this.state.Salon.Salon_owner_cnic}
            onChange={this.handleChange}
            name="Salon_owner_cnic"
            label="cnic"
            fullWidth
            placeholder="Please enter your cnic"
            variant="outlined"
          />
          <div>{this.state.error.Salon_owner_cnic}</div>
          <TextField
            className={classes.fields}
            value={this.state.Salon.Salon_owner_phoneNumber}
            onChange={this.handleChange}
            name="Salon_owner_phoneNumber"
            placeholder="Please enter your phone number"
            variant="outlined"
            fullWidth
            label="phone number"
          />
          <div>{this.state.error.Salon_owner_phoneNumber}</div>

          <Paper
            elevation={8}
            style={{
              justifyContent: "center",
              flexGrow: 1,
              display: "flex",
              flexWrap: "wrap",
              marginTop: 15,
            }}
          >
            <span style={{ padding: 10 }}>
              <Typography style={{ color: "green", marginRight: 15 }}>
                Starting time
              </Typography>
              <TimePicker
                label="select starting time"
                onChange={this.handle_opening_time_change}
                value={this.state.Salon_opening_hours}
                isOpen={false}
                clearIcon="Clear"
                clockAriaLabel="Toggle clock"
                clockIcon=""
                required={true}
              />
            </span>

            <span style={{ padding: 10 }}>
              <Typography style={{ color: "green", marginRight: 15 }}>
                Closing time
              </Typography>
              <TimePicker
                onChange={this.handle_closing_time_change}
                value={this.state.Salon_closing_hours}
                isOpen={false}
                clearIcon="Clear"
                clockAriaLabel="Toggle clock"
                clockIcon=""
                required={true}
              />
            </span>
          </Paper>

          <br></br>

          <Button
            fullWidth
            className={(classes.fields, classes.button)}
            variant="contained"
            color="primary"
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
Sign_Up.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sign_Up);
