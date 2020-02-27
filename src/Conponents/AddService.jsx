import React, { Component } from "react";
import { InputText, Button } from "primereact/inputtext";
import Joi from "joi-browser";
import axios from "axios";

class Add_Service extends Component {
	state = {
		Service: {
			service_id: "",
			service_name: "half cut",
			category_name: "",
			Salon_id: "",
			price: 20,
			img_url: "",
			service_description:
				"this is the haircut performed by xyz jkkjjkfd knf dfkkdf kdkd"
		},
		Category: [],
		error: {}
	};
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.validate = this.validate.bind(this);
		this.validate_single = this.validate_single.bind(this);
		this.handlefilechange = this.handlefilechange.bind(this);
	}

	schema = {
		service_name: Joi.string()
			.required()
			.min(2)
			.label("Service Name"),
		// category_name: Joi.string()
		// 	.required()
		// 	.min(5)
		// 	.label("Category"),
		price: Joi.number()
			.required()
			.min(1)
			.label("confirm_NewPassword"),

		img_url: Joi.required()
	};

	validate() {
		const { error } = Joi.validate(this.state.Service, this.schema, {
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
		console.log(this.state.Service[field_name]);
		const { error } = Joi.validate(
			this.state.Service[field_name],
			this.schema[field_name]
		);
		if (!error) return null;
		return error;
	}
	async handleSubmit(e) {
		//	console.log("state is ", this.state.Service);

		let form_data = new FormData();
		form_data.append("image", this.state.Service.img_url);
		form_data.append("servicename", this.state.Service.service_name);
		form_data.append("price", this.state.Service.price);
		form_data.append("description", this.state.Service.service_description);
		const error = this.validate();
		this.setState({ error: error || {} });
		console.log("form data is ", form_data);
		axios({
			url: "http://localhost:5000/Digital_Saloon.com/api/salonservices",
			method: "POST",
			data: form_data
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				alert(error);
			});
	}
	handleChange = e => {
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

	handlefilechange = e => {
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
		return (
			<div className="container">
				<input
					type="file"
					onChange={this.handlefilechange}
					//	value={this.state.Service.img_url}
					//name="img_url"
				></input>
				<br></br>
				<span className="p-float-label">
					<label htmlFor="service_name">Service name</label>
					<InputText
						id="service_name"
						placeholder="xyz@gmail.com"
						value={this.state.Service.service_name}
						onChange={this.handleChange}
						name="service_name"
					/>
					<br></br>
					<div>{this.state.error.service_name}</div>
				</span>
				<span className="p-float-label">
					<label htmlFor="service_price">Service Price</label>
					<InputText
						id="service_price"
						placeholder="xyz@gmail.com"
						value={this.state.Service.price}
						onChange={this.handleChange}
						name="price"
					/>
					<br></br>
					<div>{this.state.error.price}</div>
				</span>

				<InputText
					fullWidth
					placeholder="xyz@gmail.com"
					value={this.state.Service.service_description}
					onChange={this.handleChange}
					name="price"
				/>
				<div>{this.state.error.price}</div>
				<Button
					//	variant="contained"
					color="primary"
					//	fullWidth
					disabled={this.validate()}
					onClick={this.handleSubmit}
					label="Primary"
					className="p-button-raised p-button-rounded"
				>
					Add service
				</Button>
			</div>
		);
	}
}

export default Add_Service;
