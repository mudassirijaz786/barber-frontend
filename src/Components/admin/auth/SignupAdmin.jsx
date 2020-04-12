import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastsStore } from "react-toasts";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  control: {
    padding: 10,
  },
  button: {
    background: "linear-gradient(45deg, #020024 30%, #090979 90%)",
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
  error: {
    color: "red",
  },
  backendErrorStyle: {
    color: "red",
    textAlign: "center",
  },
  paperStyle: {
    margin: "2px",
    textAlign: "center",
    color: "black",
    marginTop: 30,
  },
});
class SignupAdmin extends Component {
  state = {
    Admin: {
      email: "ali@gmail.com",
      password: "password1122",
      name: "dasdasd",
      phonenumber: "93949494949449",
    },
    error: {},
    backendError: "",

    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).max(20).label("Password"),
    phonenumber: Joi.number()
      .required()
      .min(11)
      //.max(13)
      .label("Phonenumber"),
    name: Joi.string().min(3).max(10).label("Name"),
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
    const { error } = Joi.validate(this.state.Admin, this.schema, {
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
      this.state.Admin[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;

    //	const errors = {};
    //errors[field_name]=error.details.message
  }

  async handleSubmit(e) {
    const error = this.validate();
    this.setState({ error: error || {}, loading: true });
    //const port=5000
    axios
      .post(
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin",
        //	"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
        {
          name: this.state.Admin.name,
          email: this.state.Admin.email,
          password: this.state.Admin.password,
          phonenumber: this.state.Admin.phonenumber,
        }
      )
      .then((response) => {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        console.log("TOKEN", token);
        console.log("RESPONSE", response);
        this.props.history.push("/admin/login");
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);

          this.setState({
            backendError: error.response.data,
          });
        }
      });
    this.setState({ loading: false });

    //	const result = await axios.post(url, this.state.Salon);
    //	console.log(result);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.type);
    //console.log(e.currentTarget.name);
    const Admin = { ...this.state.Admin };
    //console.log(Salon);
    Admin[name] = value;
    this.setState({ Admin });
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
                  Admin signup here
                </Box>
              </Typography>
              <Typography className={classes.backendErrorStyle} variant="h5">
                {this.state.backendError}
              </Typography>
              <Paper
                style={{
                  margin: "2px",
                  textAlign: "center",
                  color: "black",
                  marginTop: 30,
                }}
              >
                <TextField
                  placeholder="Please enter your email"
                  value={this.state.Admin.email}
                  onChange={this.handleChange}
                  name="email"
                  label="email"
                  fullWidth
                  variant="standard"
                />
                <div style={{ color: "red" }}>{this.state.error.email}</div>

                <TextField
                  variant="standard"
                  placeholder="Please enter your password"
                  value={this.state.Admin.password}
                  onChange={this.handleChange}
                  label="password"
                  fullWidth
                  name="password"
                />
                <div>{this.state.error.password}</div>
                <TextField
                  variant="standard"
                  value={this.state.Admin.name}
                  onChange={this.handleChange}
                  label=" name"
                  fullWidth
                  name="name"
                  placeholder="Please enter your name"
                />
                <div>{this.state.error.name}</div>

                <TextField
                  value={this.state.Admin.phonenumber}
                  onChange={this.handleChange}
                  name="phonenumber"
                  placeholder="Please enter your phone number"
                  variant="standard"
                  style={{ marginBottom: 20 }}
                  fullWidth
                  label="phone number"
                />
                <div>{this.state.error.phonenumber}</div>

                <Button
                  variant="contained"
                  color="primary"
                  className={(classes.fields, classes.button)}
                  fullWidth
                  disabled={this.validate()}
                  onClick={this.handleSubmit}
                >
                  Signup
                </Button>
              </Paper>
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

SignupAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupAdmin);
