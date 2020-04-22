import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import { ToastsStore } from "react-toasts";
import { ProgressSpinner } from "primereact/progressspinner";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  buttonProgress: {
    color: "green",
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
class Login extends Component {
  state = {
    account: {
      email: "salonowner1@gmail.com",
      password: "1ff4567",
    },
    error: {},
    loading: false,

    backendError: "",
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
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};

    error.details.map((item) => {
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
    this.setState({ error: error || {}, loading: true });
    //const port=5000
    await axios
      .post(
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/login/salonOwner",
        {
          email: this.state.account.email,
          password: this.state.account.password,
        }
      )
      .then((response) => {
        const token = response.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        console.log("TOKEN", token);
        // console.log("RESPONSE", response);
        // this.props.history.push("/calender");
        this.setState({
          loading: false,
        });
        //sb components ur jay ge and route pr push kr deta ha bs

        window.location = "/calender";
      })
      .catch((error) => {
        //	alert(error.data);
        if (error.response) {
          ToastsStore.error(error.response.data);
          this.setState({
            backendError: error.response.data,
            loading: false,
          });
          //   alert(error.response.data);
          //		console.log(error.response.status);
          //		console.log(error.response.headers);
        }
      });
    //	const result = await axios.post(url, this.state.Salon);
    //	console.log(result);
  }
  handleChange = (e) => {
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
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div> {this.state.loading && <ColorLinearProgress size={30} />}</div>
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
              Please login as a salon owner
            </Typography>
            <Typography className={classes.backendErrorStyle} variant="h5">
              {this.state.backendError}
            </Typography>
            <TextField
              label="email"
              variant="outlined"
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
              variant="outlined"
              placeholder="Please enter your password"
            />
            <div className={classes.error}>{this.state.error.password}</div>

            <div>
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
              {/* {this.state.loading && <ColorLinearProgress size={40} />} */}
            </div>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
