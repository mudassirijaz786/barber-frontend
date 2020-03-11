import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import Joi from "joi-browser";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  button: {
    background: "linear-gradient(45deg, #020024 30%, #090979 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  backendErrorStyle: {
    color: "red",
    textAlign: "center"
  },
  fields: {
    marginTop: 15
  },
  error: {
    color: "red"
  },
  paperStyle: {
    margin: "2px",
    textAlign: "center",
    color: "black",
    marginTop: 30
  }
});
class Sign_Up extends Component {
  state = {
    Salon: {
      Salon_owner_email: "ali@gmail.com",
      Salon_owner_password: "1ff4567",
      Salon_owner_cnic: "949494949494",

      Salon_owner_phoneNumber: "93949494949449",
      Salon_owner_firstName: "alia",
      Salon_owner_lastName: "rais",
      Salon_Name: "tony and guy"
    },
    error: {},
    backendError: ""
  };

  schema = {
    Salon_owner_email: Joi.string()
      .email()
      .required()
      .label("Email"),
    Salon_owner_password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
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
    Salon_owner_firstName: Joi.string()
      .min(3)
      .max(10)
      .label("FirstName"),
    Salon_owner_lastName: Joi.string()
      .min(3)
      .max(10)
      .label("LastName"),
    Salon_Name: Joi.string()
      .min(3)
      .max(30)
      .label("SalonName")
  };
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate_single = this.validate_single.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    //console.log("validate funcctions is called");
    const { error } = Joi.validate(this.state.Salon, this.schema, {
      abortEarly: false
    });
    if (!error) return null;
    const errors = {};
    // for(let item of error.details)
    // )
    error.details.map(item => {
      errors[item.path[0]] = item.message;
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
    const error = this.validate();
    this.setState({ error: error || {} });
    //const port=5000
    axios
      .post(
        "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
        {
          Salon_owner_firstName: this.state.Salon.Salon_owner_firstName,
          Salon_owner_lastName: this.state.Salon.Salon_owner_lastName,
          email: this.state.Salon.Salon_owner_email,
          password: this.state.Salon.Salon_owner_password,
          phoneNumber: this.state.Salon.Salon_owner_phoneNumber,
          cnic: this.state.Salon.Salon_owner_cnic,
          salonname: this.state.Salon.Salon_Name
        }
      )
      .then(function(response) {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        console.log("TOKEN", token);
        console.log("RESPONSE", response);
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            backendError: error.response.data
          });
          //   alert(error.response.data);
          //		console.log(error.response.status);
          //		console.log(error.response.headers);
        }
      });
    //	const result = await axios.post(url, this.state.Salon);
    //	console.log(result);
  }

  handleChange = e => {
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
      <Grid center container spacing={3} className={classes.root}>
        <Grid item center xs={8} sm={4} lg={4} md={4} spacing={10}>
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
          </Typography>{" "}
          <Typography className={classes.backendErrorStyle} variant="h5">
            {this.state.backendError}
          </Typography>
          <TextField
            placeholder="Please enter your email"
            value={this.state.Salon.Salon_owner_email}
            className={classes.fields}
            onChange={this.handleChange}
            name="Salon_owner_email"
            label="email"
            fullWidth
            variant="standard"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_email}
          </div>
          <TextField
            variant="standard"
            className={classes.fields}
            type="password"
            placeholder="Please enter your password"
            value={this.state.Salon.Salon_owner_password}
            onChange={this.handleChange}
            label="password"
            fullWidth
            name="Salon_owner_password"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_password}
          </div>
          <TextField
            className={classes.fields}
            variant="standard"
            value={this.state.Salon.Salon_owner_firstName}
            onChange={this.handleChange}
            label="first name"
            fullWidth
            name="Salon_owner_firstName"
            placeholder="Please enter your firstname"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_firstName}
          </div>
          <TextField
            className={classes.fields}
            value={this.state.Salon.Salon_owner_lastName}
            onChange={this.handleChange}
            name="Salon_owner_lastName"
            placeholder="Please enter your lastname"
            label="lastname"
            fullWidth
            sm={6}
            variant="standard"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_lastName}
          </div>
          <TextField
            value={this.state.Salon.Salon_owner_cnic}
            onChange={this.handleChange}
            name="Salon_owner_cnic"
            label="cnic"
            className={classes.fields}
            fullWidth
            placeholder="Please enter your cnic"
            variant="standard"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_cnic}
          </div>
          <TextField
            value={this.state.Salon.Salon_owner_phoneNumber}
            onChange={this.handleChange}
            name="Salon_owner_phoneNumber"
            placeholder="Please enter your phone number"
            variant="standard"
            className={classes.fields}
            fullWidth
            label="phone number"
          />
          <div className={classes.error}>
            {this.state.error.Salon_owner_phoneNumber}
          </div>
          <TextField
            value={this.state.Salon.Salon_Name}
            placeholder="Please enter your salon name"
            onChange={this.handleChange}
            name="Salon_Name"
            fullWidth
            style={{ marginBottom: 20 }}
            variant="standard"
            label="salon name"
          />
          <div className={classes.error}>{this.state.error.Salon_Name}</div>
          <Button
            variant="contained"
            color="primary"
            className={(classes.fields, classes.button)}
            fullWidth
            style={{ marginBottom: 6 }}
            disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Sign_Up.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sign_Up);
