import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import Joi from "joi-browser";
import { Button } from "primereact/button";
import axios from "axios";
class Login extends Component {
	state = {
		account: {
			email: "",
			password: ""
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
		//const port=5000
		axios
			.post(
				"http://localhost:5000//Digital_Saloon.com/api/login/salonOwner",
				{ crossdomain: true },
				{
					email: this.state.account.email,
					password: this.state.account.password
				}
			)
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				alert(error);
				//console.log(error);
			});
		//	const result = await axios.post(url, this.state.Salon);
		//	console.log(result);
	}
	handleChange = e => {
		const { name, value } = e.target;
		//console.log(e.type);
		//console.log(e.currentTarget.name);
		const Salon = { ...this.state.Salon };
		//console.log(Salon);
		Salon[name] = value;
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
		email: Joi.string()
			.email()
			.required()
			.label("Email"),
		password: Joi.string()
			.required()
			.min(5)
			.label("Password")
	};
	render() {
		return (
			<div className="container">
				<span className="p-float-label">
					<label htmlFor="Email">Email</label>
					<InputText
						id="Email"
						placeholder="xyz@gmail.com"
						value={this.state.account.email}
						onChange={this.handleChange}
						name="email"
					/>
					<br></br>
					<div>{this.state.error.email}</div>
				</span>

				<br></br>
				<span className="p-float-label">
					<label htmlFor="password">password</label>
					<InputText
						id="password"
						value={this.state.account.password}
						onChange={this.handleChange}
						name="password"
					/>
					<br></br>

					<div>{this.state.error.password}</div>
				</span>
				<br></br>
			</div>
		);
	}
}

export default Login;
