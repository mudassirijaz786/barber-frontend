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

import { ProgressSpinner } from "primereact/progressspinner";

import TimePicker from "react-time-picker";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

class Sign_Up extends Component {
  state = {
    Salon: {
      Salon_owner_email: "ijazmudassir786@gmail.com",
      Salon_owner_password: "1ff4567",
      Salon_owner_cnic: "949494949494",

      Salon_owner_phoneNumber: "93949494949449",
      Salon_owner_firstName: "alia",
      Salon_owner_lastName: "rais",
      Salon_Name: "",
    },
    latLng: {
      lat: "",
      lng: "",
    },
    loading: false,

    Salon_opening_hours: "10:00",
    Salon_closing_hours: "23:00",
    error: {},
  };

  schema = {
    Salon_owner_email: Joi.string().email().required().label("Email"),
    Salon_owner_password: Joi.string().required().min(5).label("Password"),
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
    Salon_owner_lastName: Joi.string().min(3).max(10).label("LastName"),
    Salon_Name: Joi.string().min(3).max(200).label("SalonName"),
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
    console.log("state is ", this.state);
    const error = this.validate();
    this.setState({ error: error || {}, loading: true });
    //const port=5000
    axios
      .post(
        // "http://localhost:5000/Digital_Saloon.com/api/SalonSignUp",
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
        {
          Salon_owner_firstName: this.state.Salon.Salon_owner_firstName,
          Salon_owner_lastName: this.state.Salon.Salon_owner_lastName,
          email: this.state.Salon.Salon_owner_email,
          password: this.state.Salon.Salon_owner_password,
          phoneNumber: this.state.Salon.Salon_owner_phoneNumber,
          cnic: this.state.Salon.Salon_owner_cnic,
          salonname: this.state.Salon.Salon_Name,
          latitude: this.state.latLng.lat,
          longitude: this.state.latLng.lng,
          Salon_opening_hours: this.state.Salon_opening_hours,
          Salon_closing_hours: this.state.Salon_closing_hours,
        }
      )
      .then(function (response) {
        ToastsStore.success(
          "Your request for salon account has been submitted successfully please wait for account verification",
          10000
        );

        console.log(response);
        setTimeout(() => {
          window.location = "/login";
        }, 10000);
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);
          this.setState({
            backendError: error.response.data,
          });
          // alert(error.response.data);
        }
      });
    this.setState({ loading: false });

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
    return (
      <Grid
        center
        container
        spacing={3}
        style={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Grid item center xs={8} sm={8} lg={4} md={6} spacing={10}>
          {this.state.loading ? (
            <ProgressSpinner
              style={{ width: "50px", height: "50px", paddingLeft: 350 }}
              strokeWidth="8"
              fill="#EEEEEE"
            />
          ) : (
            <div>
              <Typography component="div">
                <Box
                  fontSize={16}
                  fontWeight="fontWeightBold"
                  textAlign="center"
                  m={1}
                  color="indigo"
                >
                  New Salon owner? Signup now
                </Box>
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
                style={{ marginTop: 15 }}
                fullWidth
                variant="standard"
              />
              <div style={{ color: "red" }}>
                {this.state.error.Salon_owner_email}
              </div>

              <TextField
                variant="standard"
                placeholder="Please enter your password"
                value={this.state.Salon.Salon_owner_password}
                onChange={this.handleChange}
                label="password"
                style={{ marginTop: 15 }}
                fullWidth
                type="password"
                name="Salon_owner_password"
              />
              <div>{this.state.error.Salon_owner_password}</div>
              <TextField
                variant="standard"
                style={{ marginTop: 15 }}
                value={this.state.Salon.Salon_owner_firstName}
                onChange={this.handleChange}
                label="first name"
                fullWidth
                name="Salon_owner_firstName"
                placeholder="Please enter your firstname"
              />
              <div>{this.state.error.Salon_owner_firstName}</div>
              <TextField
                value={this.state.Salon.Salon_owner_lastName}
                onChange={this.handleChange}
                style={{ marginTop: 15 }}
                name="Salon_owner_lastName"
                placeholder="Please enter your lastname"
                label="lastname"
                fullWidth
                variant="standard"
              />
              <div>{this.state.error.Salon_owner_lastName}</div>
              <TextField
                style={{ marginTop: 15 }}
                value={this.state.Salon.Salon_owner_cnic}
                onChange={this.handleChange}
                name="Salon_owner_cnic"
                label="cnic"
                fullWidth
                placeholder="Please enter your cnic"
                variant="standard"
              />
              <div>{this.state.error.Salon_owner_cnic}</div>
              <TextField
                style={{ marginTop: 15 }}
                value={this.state.Salon.Salon_owner_phoneNumber}
                onChange={this.handleChange}
                name="Salon_owner_phoneNumber"
                placeholder="Please enter your phone number"
                variant="standard"
                fullWidth
                label="phone number"
              />
              <div>{this.state.error.Salon_owner_phoneNumber}</div>

              <PlacesAutocomplete
                value={this.state.Salon.Salon_Name}
                onChange={this.handleChangessalonserach}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <TextField
                      style={{ marginTop: 15 }}
                      {...getInputProps({
                        placeholder: "Search Salon...",
                        className: "location-search-input",
                      })}
                      name="Salon_Name"
                      label="salon name"
                      fullWidth
                      variant="standard"
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <div>{this.state.error.Salon_Name}</div>

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
                style={{
                  background:
                    "linear-gradient(45deg, #020024 30%, #090979 90%)",
                  border: 0,
                  borderRadius: 3,
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  color: "white",
                  height: 48,
                  padding: "0 30px",
                  marginTop: 15,
                }}
                variant="contained"
                color="primary"
                // disabled={this.validate()}
                onClick={this.handleSubmit}
              >
                Signup
              </Button>
              <Grid
                item
                xs={2}
                style={{
                  padding: "2px",
                  alighItem: "center",
                  color: "black",
                }}
              ></Grid>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs",
})(Sign_Up);
