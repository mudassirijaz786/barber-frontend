class Add_Service extends Component {
	state = {
		Service: {
			service_id: "",
			service_name: "",
			category_name: "",
			Salon_id: "",
			price: "",
			img_url: "",
			service_description: ""
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
		service_name: Joi.string()
			.required()
			.min(2)
			.label("Service Name"),
		category_name: Joi.string()
			.required()
			.min(5)
			.label("Category"),
		price: Joi.number()
			.required()
			.min(1)
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
					<label htmlFor="service_name">oldPassword</label>
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
					<label htmlFor="service_price">servicePassword</label>
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
				<span className="p-float-label">
					<label htmlFor="category">Category</label>
					<InputText
						id="category"
						placeholder="xyz@gmail.com"
						value={this.state.Service.category_name}
						onChange={this.handleChange}
						name="category_name"
					/>
					<br></br>
					<div>{this.state.error.category_name}</div>
				</span>
			</div>
		);
	}
}

export default Add_Service;
