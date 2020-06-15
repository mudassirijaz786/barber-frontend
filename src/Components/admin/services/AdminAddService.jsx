//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import PropTypes from "prop-types";
import { ToastsStore } from "react-toasts";
import AddIcon from "@material-ui/icons/Add";
import { DropzoneDialog } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Container,
  CssBaseline,
  Box,
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

//class AdminAddService
class AdminAddService extends Component {
  state = {
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
    category: ["Hair", "Facial", "Khat"],
    time: ["30", "45", "60", "90", "120"],
    value: "",
    isLoading: false,
    open: false,
    files: [],
    error: {},
  };

  schema = {
    service_name: Joi.string().required().min(4).label("Service Name"),
    price: Joi.number().required().min(2).label("Service Price"),
    service_description: Joi.string()
      .required()
      .min(9)
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
    let form_data = new FormData();
    form_data.append("image", Service.img_url);
    form_data.append("servicename", Service.service_name);
    form_data.append("price", Service.price);
    form_data.append("description", Service.service_description);
    form_data.append("service_category", Service.category_name);
    form_data.append("service_time", Service.service_time);
    const error = this.validate();
    this.setState({ error: error || {}, isLoading: true });
    axios({
      url: url + "/recomended_services",
      method: "POST",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        ToastsStore.success("Service added successfully by admin", 5000);
        this.setState({ isLoading: false });
        setTimeout(() => {
          this.props.history.push("/admin/services");
        }, 5000);
      })
      .catch((error) => {
        ToastsStore.error(error);
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
    const { classes } = this.props;
    const { isLoading, Service, error, category, time } = this.state;
    return (
      <React.Fragment>
        <div>{isLoading && <ColorLinearProgress size={30} />}</div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box color="indigo">
            <Typography variant="h3" align="center">
              Create Service
            </Typography>
          </Box>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Please create service as an admin
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.fields}
                error={error.service_name}
                helperText={error.service_name}
                value={Service.service_name}
                onChange={this.handleChange}
                name="service_name"
                label="Service name"
                variant="outlined"
                placeholder="Please enter service name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.fields}
                fullWidth
                error={error.price}
                helperText={error.price}
                value={Service.price}
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
            multiline
            rows={2}
            rowsMax={3}
            value={Service.service_description}
            onChange={this.handleChange}
            error={error.service_description}
            helperText={error.service_description}
            name="service_description"
            label="Description"
            variant="outlined"
            placeholder="Please enter service description"
          />
          <TextField
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
            select
            variant="outlined"
            className={classes.fields}
            label="Service Time"
            value={Service.service_time}
            onChange={this.selectedTime}
            helperText="Please select service time"
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
            className={classes.button}
            color="primary"
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

AdminAddService.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting AdminAddService
export default withStyles(styles)(AdminAddService);
