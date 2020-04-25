//importing
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import { Add as AddIcon } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Button,
  IconButton,
  CssBaseline,
  LinearProgress,
  Grid,
  Box,
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

//class OwnerEditService
class OwnerEditService extends Component {
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
  }

  componentDidMount() {
    this.setState({ Service: this.props.location.items });
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

  async handleSubmit(e) {
    try {
      const { Service, service_time, price } = this.state;
      let form_data = new FormData();
      form_data.append("image", Service.image_url);
      form_data.append("servicename", Service.serviceName);
      form_data.append("price", price);
      form_data.append("description", Service.serviceDescription);
      form_data.append("service_category", Service.service_category);
      form_data.append("service_time", service_time);
      this.setState({ isLoading: true });
      var token = localStorage.getItem("x-auth-token");
      const promise = axios({
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
      });
      console.log(promise);
      promise
        .then((response) => {
          ToastsStore.success(
            "Service edited successfully by salon owner",
            5000
          );
          this.setState({ isLoading: false });
          console.log(response);
          setTimeout(() => {
            window.location = "/services";
          }, 5000);
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
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
  };

  render() {
    if (!this.props.location.items) {
      return <Redirect to="/services" />;
    }
    const { classes } = this.props;
    const {
      isLoading,
      Service,
      error,
      category,
      time,
      price,
      service_time,
    } = this.state;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <div>{isLoading && <ColorLinearProgress size={30} />}</div>
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
                onChange={this.handleChange}
                name="price"
                label="Price"
                variant="outlined"
                placeholder="Please enter price"
              />
            </Grid>
          </Grid>
          <TextField
            className={classes.fields}
            fullWidth
            value={Service.serviceDescription}
            onChange={this.handleChange}
            name="service_description"
            label="Description"
            disabled={true}
            variant="outlined"
            placeholder="Please enter service description"
          />
          <TextField
            select
            disabled={true}
            className={classes.fields}
            label={Service.service_category}
            value={Service.service_category}
            onChange={this.selectedCategory}
            helperText="Please select service category"
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
            select
            variant="outlined"
            className={classes.fields}
            label="Service Time"
            value={service_time}
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
            onClick={this.handleSubmit}
          >
            Edit service
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

OwnerEditService.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerEditService
export default withStyles(styles)(OwnerEditService);
