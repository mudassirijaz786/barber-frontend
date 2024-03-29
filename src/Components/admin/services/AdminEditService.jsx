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
  IconButton,
  MenuItem,
  Container,
  Button,
  CssBaseline,
  Grid,
  Box,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { url } from "../../../../src/config.json";

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
  imageField: { paddingTop: 8 },
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

//class AdminEditService
class AdminEditService extends Component {
  constructor() {
    super();
    this.state = {
      Service: {
        service_id: "",
        service_name: "",
        category_name: "",
        Salon_id: "",
        price: "",
        img_url: "",
        service_description: "",
        service_time: "",
      },
      service_id: null,
      category: ["Hair", "Facial", "Khat"],
      time: ["30", "45", "60", "90", "120"],
      value: "",
      open: false,
      isLoading: false,
      files: [],
      error: {},
    };
  }

  componentDidMount() {
    this.setState({ service_id: this.props.location.items._id });
    this.setState({ Service: this.props.location.items });
    this.setState({ price: this.props.location.items.servicePrice });
    this.setState({
      description: this.props.location.items.serviceDescription,
    });
  }

  schema = {
    service_name: Joi.string().required().min(2).label("Service Name"),
    price: Joi.number().required().min(2).label("Service Price"),
    service_description: Joi.string()
      .required()
      .min(2)
      .label("Service Description"),
    img_url: Joi.required(),
  };

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

  validate = () => {
    const { Service } = this.state;
    const { error } = Joi.validate(Service, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    return errors;
  };

  validate_single = (field_name) => {
    const { error } = Joi.validate(
      this.state.Service[field_name],
      this.schema[field_name]
    );
    if (!error) return null;
    return error;
  };

  handleSubmit = async () => {
    const { Service } = this.state;
    console.log(this.props.location.items._id);
    let form_data = new FormData();
    form_data.append("image", Service.img_url);
    form_data.append("servicename", Service.service_name);
    form_data.append("price", this.state.price);
    form_data.append("description", Service.service_description);
    form_data.append("service_category", Service.category_name);
    form_data.append("service_time", this.state.service_time);
    const error = this.validate();
    this.setState({ error: error || {}, isLoading: true });
    var token = localStorage.getItem("x-auth-token");
    console.log(token);
    await axios({
      url: url + "/recomended_services/" + this.props.location.items._id,
      method: "PUT",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        ToastsStore.success("Service edited successfully by admin", 2000);
        this.setState({ isLoading: false });
        setTimeout(() => {
          window.location = "/admin/services";
        }, 2000);
      })
      .catch((error) => {
        ToastsStore.error("Error in updation");
        this.setState({ isLoading: false });
      });
  };

  selectedCategory = (e) => {
    const Service = { ...this.state.Service };
    Service.category_name = e.target.value;
    this.setState({ Service });
  };

  selectedTime = (e) => {
    const Service = { ...this.state.Service };
    Service.service_time = e.target.value;
    this.setState({ Service });
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
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;
      if (size < 10240) {
        const Service = { ...this.state.Service };
        Service["img_url"] = e.target.files[0];
        this.setState({ Service });
      }
    }
  };

  render() {
    if (!this.props.location.items) {
      return <Redirect to="/admin/services" />;
    }
    const { classes } = this.props;
    const { isLoading, Service, error, category, time } = this.state;
    return (
      <React.Fragment>
        <div>{isLoading && <ColorLinearProgress size={30} />}</div>
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
            Please edit service as an admin
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.fields}
                value={Service.service_name}
                onChange={this.handleChange}
                name="service_name"
                label="Service name"
                variant="outlined"
                error={error.service_name}
                helperText={error.service_name}
                placeholder="Please enter service name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.fields}
                fullWidth
                value={Service.price}
                onChange={this.handleChange}
                name="price"
                label="Price"
                variant="outlined"
                error={error.price}
                helperText={error.price}
                placeholder="Please enter price"
              />
            </Grid>
          </Grid>
          <TextField
            className={classes.fields}
            fullWidth
            value={Service.service_description}
            onChange={this.handleChange}
            name="service_description"
            label="Description"
            variant="outlined"
            error={error.service_description}
            helperText={error.service_description}
            placeholder="Please enter service description"
          />
          <TextField
            id="filled-select-currency"
            select
            className={classes.fields}
            label="Service Category"
            value={Service.category_name}
            onChange={this.selectedCategory}
            helperText="Please select service category"
            variant="outlined"
            fullWidth
          >
            {category.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-currency"
            select
            variant="outlined"
            className={classes.fields}
            label="Service Time"
            value={Service.service_time}
            helperText="Please select service time"
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
                className={classes.imageField}
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
            className={[classes.fields, classes.button]}
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

AdminEditService.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting AdminEditService
export default withStyles(styles)(AdminEditService);
