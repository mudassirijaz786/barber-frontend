import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import PropTypes from "prop-types";

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
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
  paper: {
    display: "flex",
    flexWrap: "wrap",
  },
  error: {
    color: "red",
  },
});
class AddServiceByAdmin extends Component {
  state = {
    Service: {
      service_id: "",
      service_name: "half cut",
      category_name: "",
      Salon_id: "",
      price: 20,
      img_url: "",
      service_description: "hair cut service provided by tony and guy",
      service_time: "",
    },
    category: ["Hair", "Facial", "Khat"],
    time: ["30", "45", "60", "90", "120"],

    value: "",
    open: false,
    files: [],
    error: {},
  };
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validate_single = this.validate_single.bind(this);
    this.handlefilechange = this.handlefilechange.bind(this);
  }

  componentDidMount() {
    console.log("GET TOKEN", localStorage.getItem("x-auth-token"));
  }
  schema = {
    service_name: Joi.string().required().min(2).label("Service Name"),
    // category_name: Joi.string()
    // 	.required()
    // 	.min(5)
    // 	.label("Category"),
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
    const { error } = Joi.validate(this.state.Service, this.schema, {
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
    form_data.append("image", this.state.Service.img_url);
    form_data.append("servicename", this.state.Service.service_name);
    form_data.append("price", this.state.Service.price);
    form_data.append("description", this.state.Service.service_description);
    form_data.append("service_category", this.state.Service.category_name);
    form_data.append("service_time", this.state.Service.service_time);

    const error = this.validate();
    this.setState({ error: error || {} });
    console.log("form data is ", form_data);
    axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/recomended_services",
      method: "POST",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("RESPONSE", response);

        this.props.history.push("/admin/services");
      })
      .catch(function (error) {
        alert(error);
      });
  }
  selectedCategory = (e) => {
    const Service = { ...this.state.Service };
    Service.category_name = e.target.value;
    this.setState({ Service });
    console.log(this.state.Service.category_name);
  };

  selectedTime = (e) => {
    const Service = { ...this.state.Service };
    Service.service_time = e.target.value;
    this.setState({ Service });
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
              Create service by admin
            </Box>
          </Typography>{" "}
          {/* <input
            fullWidth
            type="file"
            onChange={this.handlefilechange}
            //	value={this.state.Service.img_url}
            //name="img_url"
          ></input> */}
          <TextField
            fullWidth
            className={classes.fields}
            value={this.state.Service.service_name}
            onChange={this.handleChange}
            name="service_name"
            label="Service name"
            variant="standard"
            placeholder="Please enter service name"
          />
          <div className={classes.error}>{this.state.error.service_name}</div>
          <TextField
            className={classes.fields}
            fullWidth
            value={this.state.Service.price}
            onChange={this.handleChange}
            name="price"
            label="Price"
            variant="standard"
            placeholder="Please enter price"
          />
          <div className={classes.error}>{this.state.error.price}</div>
          <TextField
            className={classes.fields}
            fullWidth
            value={this.state.Service.service_description}
            onChange={this.handleChange}
            name="service_description"
            label="Description"
            variant="standard"
            placeholder="Please enter service description"
          />
          <div className={classes.error}>{this.state.error.description}</div>
          <TextField
            id="filled-select-currency"
            select
            className={classes.fields}
            label="Please select service category"
            value={this.state.Service.category_name}
            onChange={this.selectedCategory}
            //   helperText="Please select service category"
            // variant="filled"
            fullWidth
          >
            {this.state.category.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-currency"
            select
            className={classes.fields}
            label="Please select service time"
            value={this.state.Service.service_time}
            onChange={this.selectedTime}
            fullWidth
          >
            {this.state.time.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Paper className={classes.paper}>
            <Typography component="div">
              <Box
                fontSize={16}
                fontWeight="fontWeightBold"
                textAlign="center"
                m={1}
                color="indigo"
              >
                Select image
              </Box>
            </Typography>{" "}
            <Button
              onClick={this.handleOpen.bind(this)}
              className={classes.fields}
            >
              Upload
            </Button>
            <DropzoneDialog
              open={this.state.open}
              onSave={this.handleSave.bind(this)}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={this.handleClose.bind(this)}
            />
          </Paper>
          <Button
            variant="contained"
            className={(classes.fields, classes.button)}
            color="primary"
            fullWidth
            //   disabled={this.validate()}
            onClick={this.handleSubmit}
          >
            Add service
          </Button>
        </Grid>
      </Grid>
    );
  }
}

AddServiceByAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddServiceByAdmin);
