import React, { Component } from "react";
import Joi from "joi-browser";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";

import axios from "axios";
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
	paperStyle: {
		margin: "2px",
		textAlign: "center",
		color: "black",
		marginTop: 30,
	},
});
class changePassword extends Component {
	state = {
		Password: {
			old_password: "",
			new_password: "",
			confirm_new_password: "",
		},
		error: {},
	};
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.validate = this.validate.bind(this);
		this.validate_single = this.validate_single.bind(this);
	}
	schema = {
		old_password: Joi.string().required().min(5).label("oldPassword"),
		new_password: Joi.string().required().min(5).label("newPassword"),
		confirm_new_password: Joi.string()
			.required()
			.min(5)
			.label("confirm_NewPassword"),
	};
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
		console.log(this.state.Password[field_name]);
		const { error } = Joi.validate(
			this.state.Password[field_name],
			this.schema[field_name]
		);
		if (!error) return null;
		return error;
	}
	async handleSubmit(e) {
		const error = this.validate();
		this.setState({ error: error || {} });
		axios
			.patch(
				"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/login/salonOwner",
				{
					oldpassword: this.state.Password.old_password,
					newpassword: this.state.Password.new_password,
					confirm_newpassword: this.state.Password.confirm_new_password,
				}
			)
			.then((response) => {
				console.log(response);
				this.props.history.push("/password/change");
			})
			.catch(function (error) {
				alert(error);
			});
	}
	handleChange = (e) => {
		const { name, value } = e.target;

		const Salon = { ...this.state.Salon };
		Salon[name] = value;
		this.setState({ Salon });
		const error = this.validate_single(name);
		const state_error = { ...this.state.error };
		if (error) state_error[name] = error.message;
		else delete state_error[name];
		this.setState({ error: state_error });

		if (error) return;
	};

	render() {
		const { classes } = this.props;

<<<<<<< HEAD:src/Components/salonowner/auth/changePassword.jsx
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
							Forget your password? Reset now
						</Box>
					</Typography>{" "}
					<TextField
						placeholder="Please enter your old password"
						value={this.state.Password.old_password}
						onChange={this.handleChange}
						// name="old_password"
						// variant="contained"
						// color="primary"
						fullWidth
						className={classes.fields}
						label="Old password"
					/>
					<TextField
						value={this.state.Password.new_password}
						placeholder="Please enter your new password"
						label="New password"
						fullWidth
						onChange={this.handleChange}
						className={classes.fields}
=======
    return (
      <Grid center container spacing={3} className={classes.root}>
        <Grid item center xs={8} sm={8} lg={4} md={6} spacing={10}>
          <Typography component="div">
            <Box
              fontSize={16}
              fontWeight="fontWeightBold"
              textAlign="center"
              m={1}
              color="indigo"
            >
              Forget your password? Reset now
            </Box>
          </Typography>{" "}
          <TextField
            placeholder="Please enter your old password"
            value={this.state.Password.old_password}
            onChange={this.handleChange}
            // name="old_password"
            // variant="contained"
            // color="primary"
            fullWidth
            className={classes.fields}
            label="Old password"
          />
          <TextField
            value={this.state.Password.new_password}
            placeholder="Please enter your new password"
            label="New password"
            fullWidth
            onChange={this.handleChange}
            className={classes.fields}
>>>>>>> b1795f7601873b732a7ad7a34891089d4f6f58dc:src/Components/salonowner/auth/ChangePassword.jsx

						// name="new_password"
						// variant="contained"
						// color="primary"
					/>
					<div>{this.state.error.new_password}</div>
					<TextField
						placeholder="Please confirm your password"
						label="Confirm password"
						fullWidth
						value={this.state.Password.confirm_new_password}
						onChange={this.handleChange}
						// name="confirm_new_password"
						className={classes.fields}
						style={{ marginBottom: 6 }}
						// variant="contained"
						// color="primary"
					/>
					<div>{this.state.error.confirm_new_password}</div>
					<Button
						fullWidth
						className={(classes.fields, classes.button)}
						style={{ marginBottom: 6 }}
						variant="contained"
						color="primary"
						disabled={this.validate()}
						onClick={this.handleSubmit}
					>
						Reset it now
					</Button>
				</Grid>
			</Grid>
		);
	}
}

changePassword.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(changePassword);
