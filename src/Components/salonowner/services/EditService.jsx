import React, { Component } from "react";
//error is in this file
import Joi from "joi-browser";
import axios from "axios";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
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
class CardEdit extends Component {
  constructor() {
    super();
    this.state = {
      Service: {},
      service_id: null,
      category: ["Hair", "Facial", "Khat"],
      time: ["30", "45", "60", "90", "120"],

      value: "",
      service_time: "",
      price: 20,
      open: false,
      isLoading: false,
      files: [],
      error: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validate_single = this.validate_single.bind(this);
    this.handlefilechange = this.handlefilechange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.id);
    this.setState({ Service: this.props.location.items });
    console.log("state " + this.state.service_id);
  }
  schema = {
    service_name: Joi.string().required().min(2).label("Service Name"),
    category_name: Joi.string().required().min(5).label("Category"),
    price: Joi.number().required().min(2).label("Service Price"),
    service_description: Joi.string()
      .required()
      .min(2)
      .label("Service Description"),
    img_url: Joi.required(),
  };
  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    const Service = { ...this.state.Service };
    //	console.log(Service);
    Service["img_url"] = files[0];
    //	console.log();
    //console.log("service is", Service);
    //this.setState({ Service });
    //clone = e.target.files[0];
    //	console.log("clone is ", clone);
    this.setState({ Service, files: files, open: false });
    // this.setState({
    //   files: files,
    //   open: false
    // });
    console.log(files[0].name);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }
  validate() {
    const { error } = Joi.validate(this.state, this.schema, {
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
    console.log(this.state.Service[field_name]);
    const { error } = Joi.validate(
      this.state.Service[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  }
  async handleSubmit(e) {
    console.log("state is ", this.state.Service);

    let form_data = new FormData();
    form_data.append("image", this.state.Service.image_url);
    form_data.append("servicename", this.state.Service.serviceName);
    form_data.append("price", this.state.price);
    form_data.append("description", this.state.Service.serviceDescription);
    form_data.append("service_category", this.state.Service.service_category);
    form_data.append("service_time", this.state.service_time);

    const error = this.validate();
    this.setState({ error: error || {}, isLoading: true });
    console.log("form data is ", form_data);
    var token = localStorage.getItem("x-auth-token");
    console.log("token is", token);
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/salonservices/" +
        this.state.Service._id,
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        ToastsStore.success("Service edited successfully by salon owner", 5000);
        this.setState({ isLoading: false });
        console.log(response);
        setTimeout(() => {
          window.location = "/services";
        }, 5000);
      })
      .catch((error) => {
        ToastsStore.error(error);
        this.setState({ isLoading: false });
      });
  }
  selectedCategory = (e) => {
    const Service = { ...this.state.Service };
    Service.category_name = e.target.value;
    this.setState({ Service });
    console.log(this.state.Service.category_name);
  };

  selectedTime = (e) => {
    let time = this.state.service_time;
    time = e.target.value;

    this.setState({ service_time: time });
    console.log(this.state.Service.service_time);
  };
  handleChange = (e) => {
    const { name, value } = e.target;

    const Service = { ...this.state.Service };
    Service[name] = value;
    this.setState({ Service });
    const error = this.validate_single(name);
    const state_error = { ...this.state.error };
    if (error) state_error[name] = error.message;
    else delete state_error[name];
    this.setState({ error: state_error });

    if (error) return;
  };

  handlefilechange = (e) => {
    //console.log("h", e.target.files[0].name);s
    //if (e) {
    //	console.log("name", e.target.name);
    //console.log("h", e.target.files[0]);
    //console.log("event", e.target.files[0]);
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;

      if (size < 10240) {
        //console.log("img", e.target.files[0]);
        //	this.state.Service.service_name = "ju";
        //	sconsole.log("sates", this.state.Service);
        //this.setState({ Service });
        const Service = { ...this.state.Service };
        //	console.log(Service);
        Service["img_url"] = e.target.files[0];
        //	console.log();
        //console.log("service is", Service);
        //this.setState({ Service });
        //clone = e.target.files[0];
        //	console.log("clone is ", clone);
        this.setState({ Service });
        //console.log("after updating statees", this.state.Service);
      }
    }
  };
  render() {
    if (!this.props.location.items) {
      return <Redirect to="/services" />;
    }
    const { classes } = this.props;
    console.log("item in edit file", this.state.Service);

    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <div>{this.state.isLoading && <ColorLinearProgress size={30} />}</div>
        </Container>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Edit Service
            </Typography>
          </Box>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please edit service as a salon owner
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.fields}
                value={this.state.Service.serviceName}
                onChange={this.handleChange}
                name="service_name"
                disabled={true}
                label="Service name"
                variant="outlined"
                placeholder="Please enter service name"
              />
              <div className={classes.error}>
                {this.state.error.serviceName}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.fields}
                fullWidth
                value={this.state.price}
                onChange={this.handleChange}
                name="price"
                label="Price"
                variant="outlined"
                placeholder="Please enter price"
              />
              <div className={classes.error}>{this.state.error.price}</div>
            </Grid>
          </Grid>
          <TextField
            className={classes.fields}
            fullWidth
            value={this.state.Service.serviceDescription}
            onChange={this.handleChange}
            name="service_description"
            label="Description"
            disabled={true}
            variant="outlined"
            placeholder="Please enter service description"
          />
          <div className={classes.error}>
            {this.state.error.serviceDescription}
          </div>
          <TextField
            id="filled-select-currency"
            select
            disabled={true}
            className={classes.fields}
            label={this.state.Service.service_category}
            value={this.state.Service.service_category}
            onChange={this.selectedCategory}
            //   helperText="Please select service category"
            variant="outlined"
            fullWidth
          >
            {this.state.category.map((option) => (
              <MenuItem
                key={this.state.Service.service_category}
                value={this.state.Service.service_category}
              >
                {this.state.Service.service_category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-currency"
            select
            variant="outlined"
            className={classes.fields}
            label="Please select service time"
            // value={this.state.Service.service_time}
            onChange={this.selectedTime}
            fullWidth
          >
            {this.state.time.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Grid container spacing={10}>
            <Grid item xs={8} sm={8}>
              <Typography
                style={{ paddingTop: 8 }}
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Please select image
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <IconButton
                aria-label="add"
                disabled={true}
                color="primary"
                onClick={this.handleOpen.bind(this)}
                size="medium"
              >
                <AddIcon fontSize="medium" />
              </IconButton>

              <DropzoneDialog
                filesLimit={1}
                open={this.state.open}
                onSave={this.handleSave.bind(this)}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={this.handleClose.bind(this)}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className={(classes.fields, classes.button)}
            color="primary"
            fullWidth
            //   disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            Edit service
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

CardEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardEdit);
