import React, { Component } from "react";
import Joi from "joi-browser";
import { InputText } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default class Login extends Component {
  state = {
    account: {
      email: "",
      password: ""
    },
    error: {}
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
    console.log(this.state.Salon[field_name]);
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
    axios
      .post(
        "http://localhost:5000//Digital_Saloon.com/api/login/salonOwner",
        { crossdomain: true },
        {
          email: this.state.account.email,
          password: this.state.account.password
        }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        alert(error);
        //console.log(error);
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
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
          <Paper
            style={{
              padding: "2px",
              textAlign: "center",
              color: "black"
            }}
          >
            <TextField
              label="email"
              variant="standard"
              placeholder="Please enter your email"
              value={this.state.account.email}
              onChange={this.handleChange}
              name="email"
            />
            <div>{this.state.error.email}</div>

            <TextField
              value={this.state.account.password}
              onChange={this.handleChange}
              name="password"
              label="password"
              variant="standard"
              placeholder="Please enter your password"
            />

            <div>{this.state.error.password}</div>
            <Button
              variant="contained"
              color="primary"
              className="p-button-raised p-button-rounded"
              disabled={this.validate()}
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </Paper>
          <Grid
            item
            xs={2}
            style={{
              padding: "2px",
              alighItem: "center",
              color: "black"
            }}
          ></Grid>
        </Grid>
      </Grid>
    );
  }
}
