//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import AddIcon from "@material-ui/icons/Add";
import { DropzoneDialog } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import {
  TextField,
  MenuItem,
  CssBaseline,
  Button,
  IconButton,
  LinearProgress,
  Grid,
  Box,
  TextareaAutosize,
  Typography,
  Container,
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

//class OwnerAddRecommendedService
class OwnerAddRecommendedService extends Component {
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
      description: "",
      open: false,
      isLoading: false,
      files: [],
      error: {},
    };
  }

  componentDidMount() {
    this.setState({ Service: this.props.location.items });
    this.setState({ price: this.props.location.items.servicePrice });
    this.setState({
      description: this.props.location.items.serviceDescription,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSave = (files) => {
    const Service = { ...this.state.Service };
    Service["img_url"] = files[0];
    this.setState({ Service, files: files, open: false });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleChange = (e) => {
    let { Service } = this.state;
    Service[e.target.name] = e.target.value;
    this.setState({ Service });
  };
  handleSubmit = async (e) => {
    try {
      console.log("state is ", this.state.Service);
      let form_data = new FormData();
      form_data.append("image", this.state.Service.image_url);
      form_data.append("servicename", this.state.Service.serviceName);
      form_data.append("price", this.state.price);
      form_data.append("description", this.state.description);
      form_data.append("service_category", this.state.Service.service_category);
      form_data.append("service_time", this.state.service_time);
      this.setState({ isLoading: true });
      var token = localStorage.getItem("x-auth-token");
      const promise = axios({
        url:
          "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/salonservices/recomended/service",

        method: "POST",
        data: form_data,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      });
      promise
        .then((response) => {
          ToastsStore.success(
            "Service added successfully by salon owner",
            2000
          );
          this.setState({ isLoading: false });
          console.log(response);
          setTimeout(() => {
            window.location = "/services";
          }, 2000);
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          ToastsStore.error("Service cannot be added by salon owner");
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

  render() {
    if (!this.props.location.items) {
      return <Redirect to="/services" />;
    }
    const { classes } = this.props;
    const { isLoading, Service, price, category, time } = this.state;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <div>{isLoading && <ColorLinearProgress size={30} />}</div>
        </Container>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Add Recommended Service
            </Typography>
          </Box>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please add recommended service as a salon owner
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.fields}
                value={Service.serviceName}
                onChange={this.handleChange}
                name="service_name"
                disabled={true}
                label="Service name"
                variant="outlined"
                placeholder="Please enter service name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.fields}
                fullWidth
                value={price}
                onChange={(e) => this.setState({ price: e.target.value })}
                label="Price"
                variant="outlined"
                placeholder="Please enter price"
              />
            </Grid>
          </Grid>
          <TextareaAutosize
            className={classes.fields}
            fullWidth
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            name="service_description"
            label="Description"
            variant="outlined"
            placeholder="Please enter service description"
          />
          <TextField
            id="filled-select-currency"
            select
            disabled={true}
            className={classes.fields}
            label={Service.service_category}
            value={Service.service_category}
            onChange={this.selectedCategory}
            variant="outlined"
            fullWidth
          >
            {category.map((option) => (
              <MenuItem
                key={Service.service_category}
                value={Service.service_category}
              />
            ))}
          </TextField>
          <TextField
            id="filled-select-currency"
            select
            variant="outlined"
            className={classes.fields}
            label="Please select service time"
            value={Service.service_time}
            onChange={this.selectedTime}
            fullWidth
          >
            {time.map((option) => (
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
                <AddIcon />
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
            dis
            fullWidth
            onClick={this.handleSubmit}
          >
            Add service
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

OwnerAddRecommendedService.propTypes = {
  classes: PropTypes.object.isRequired,
};

// exporting OwnerAddRecommendedService
export default withStyles(styles)(OwnerAddRecommendedService);
