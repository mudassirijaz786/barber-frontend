import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import Joi from "joi-browser";
import { Button } from "primereact/button";
import axios from "axios";
class changePassword extends Component {
	state = {
		Password: {
			old_password: "",
			new_password: "",
			confirm_new_password: ""
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
	schema = {
		old_password: Joi.string()
			.required()
			.min(5)
			.label("oldPassword"),
		new_password: Joi.string()
			.required()
			.min(5)
			.label("newPassword"),
		confirm_new_password: Joi.string()
			.required()
			.min(5)
			.label("confirm_NewPassword")
	};
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
		axios
			.patch(
				"http://localhost:5000//Digital_Saloon.com/api/login/salonOwner",
				{ crossdomain: true },
				{
					oldpassword: this.state.Password.old_password,
					newpassword: this.state.Password.new_password,
					confirm_newpassword: this.state.Password.confirm_new_password
				}
			)
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				alert(error);
			});
	}
	handleChange = e => {
		const { name, value } = e.target;

		const Salon = { ...this.state.Salon };
		Salon[name] = value;
		this.setState({ account });
		const error = this.validate_single(name);
		const state_error = { ...this.state.error };
		if (error) state_error[name] = error.message;
		else delete state_error[name];
		this.setState({ error: state_error });

		if (error) return;
	};

	render() {
		return (
			<div className="container">
				<span className="p-float-label">
					<label htmlFor="old_password">oldPassword</label>
					<InputText
						id="old_password"
						placeholder="xyz@gmail.com"
						value={this.state.password.old_password}
						onChange={this.handleChange}
						name="old_password"
					/>
					<br></br>
					<div>{this.state.error.old_password}</div>
				</span>

				<br></br>
				<span className="p-float-label">
					<label htmlFor="new_password">password</label>
					<InputText
						id="new_password"
						value={this.state.Password.new_password}
						onChange={this.handleChange}
						name="new_password"
					/>
					<br></br>

					<div>{this.state.error.new_password}</div>
				</span>
				<br></br>
				<span className="p-float-label">
					<label htmlFor="confirm_new_password">confirm_new_password</label>
					<InputText
						id="confirm_new_password"
						value={this.state.Password.confirm_new_password}
						onChange={this.handleChange}
						name="confirm_new_password"
					/>
					<br></br>

					<div>{this.state.error.confirm_new_password}</div>
				</span>
			</div>
		);
	}
}

export default changePassword;
