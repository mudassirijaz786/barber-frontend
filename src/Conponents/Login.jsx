import React, { Component } from "react";
import Joi from "joi-browser";
import { InputText } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  control: {
    padding: 10
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
  fields: {
    marginTop: 15
  },
  error: {
    color: "red"
  },
  backendErrorStyle: {
    color: "red",
    textAlign: "center"
  },
  paperStyle: {
    margin: "2px",
    textAlign: "center",
    color: "black",
    marginTop: 30
  }
});
class Login extends Component {
  state = {
    account: {
      email: "owner@gmail.com",
      password: "123123"
    },
    error: {},
    backendError: ""
  };
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validate_single = this.validate_single.bind(this);
  }

  validate() {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!error) return null;
    const errors = {};

    error.details.map(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  }
  validate_single(field_name) {
    //	console.log(this.state.Salon[field_name]);
    const { error } = Joi.validate(
      this.state.account[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  }
  async handleSubmit(e) {
    const error = this.validate();
    this.setState({ error: error || {} });
    //const port=5000
    await axios
      .post(
        "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/login/salonOwner",
        {
          email: this.state.account.email,
          password: this.state.account.password
        }
      )
      .then(function(response) {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        console.log("TOKEN", token);
        // this.props.history.push("/dashboard");
        console.log("RESPONSE", response);
      })
      .catch(error => {
        //	alert(error.data);
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
    const account = { ...this.state.account };
    //console.log(Salon);
    account[name] = value;
    this.setState({ account });
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

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
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
              Already our customer? Login now
            </Box>
          </Typography>{" "}
          <Typography className={classes.backendErrorStyle} variant="h5">
            {this.state.backendError}
          </Typography>
          <TextField
            label="email"
            variant="standard"
            placeholder="Please enter your email"
            value={this.state.account.email}
            className={classes.fields}
            onChange={this.handleChange}
            fullWidth
            name="email"
          />
          <div className={classes.error}>{this.state.error.email}</div>
          <TextField
            fullWidth
            value={this.state.account.password}
            onChange={this.handleChange}
            style={{ marginBottom: 20 }}
            className={classes.fields}
            name="password"
            label="password"
            type="password"
            variant="standard"
            placeholder="Please enter your password"
          />
          <div className={classes.error}>{this.state.error.password}</div>
          <Button
            fullWidth
            className={(classes.fields, classes.button)}
            style={{ marginBottom: 6 }}
            variant="contained"
            color="primary"
            disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
