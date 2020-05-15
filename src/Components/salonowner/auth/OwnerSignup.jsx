//importing
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import { withStyles } from "@material-ui/styles";

import TimePicker from "react-time-picker";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";
import {
	CssBaseline,
	LinearProgress,
	Container,
	Box,
	Typography,
	Grid,
	Paper,
	TextField,
	Button,
} from "@material-ui/core";

const ColorLinearProgress = withStyles({
	colorPrimary: {
		backgroundColor: "#b2dfdb",
	},
	barColorPrimary: {
		backgroundColor: "#00695c",
	},
})(LinearProgress);

//class OwnerSignup
class OwnerSignup extends Component {
	state = {
		Salon: {
			Salon_owner_email: "",
			Salon_owner_password: "",
			Salon_owner_cnic: "",
			Salon_owner_phoneNumber: "",
			Salon_owner_firstName: "",
			Salon_owner_lastName: "",
			Salon_Name: "",
		},
		latLng: {
			lat: "",
			lng: "",
		},
		loading: false,
		Salon_opening_hours: "10:00",
		Salon_closing_hours: "23:00",
		error: {},
	};

	schema = {
		Salon_owner_email: Joi.string().required().email().label("Email"),
		Salon_owner_password: Joi.string().required().min(5).label("Password"),
		Salon_owner_cnic: Joi.number().required().min(10).label("Cnic"),
		Salon_owner_phoneNumber: Joi.number()
			.required()
			.min(11)
			.label("Phonenumber"),
		Salon_owner_firstName: Joi.string()
			.required()
			.min(3)
			.max(10)
			.label("FirstName"),
		Salon_owner_lastName: Joi.string()
			.required()
			.min(3)
			.max(10)
			.label("LastName"),
		Salon_Name: Joi.string().required().min(3).max(200).label("SalonName"),
	};

	handleChangessalonserach = (Salon_Name) => {
		const Salon = { ...this.state.Salon };

		Salon["Salon_Name"] = Salon_Name;
		this.setState({ Salon });
	};

	handleSelect = (Salon_Name) => {
		const Salon = { ...this.state.Salon };
		Salon["Salon_Name"] = Salon_Name;
		this.setState({ Salon });
		geocodeByAddress(Salon_Name)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				console.log("Success", latLng);
				this.setState({
					latLng,
				});
			})
			.catch((error) => console.error("Error", error));
	};

	validate = () => {
		const { Salon } = this.state;
		const { error } = Joi.validate(Salon, this.schema, {
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
			this.state.Salon[field_name],
			this.schema[field_name]
		);
		if (!error) return null;
		return error;
	};

	handleSubmit = async () => {
		const {
			Salon,
			latLng,
			Salon_opening_hours,
			Salon_closing_hours,
		} = this.state;
		const error = this.validate();
		this.setState({ error: error || {}, loading: true });
		axios
			.post(
				"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
				{
					Salon_owner_firstName: Salon.Salon_owner_firstName,
					Salon_owner_lastName: Salon.Salon_owner_lastName,
					email: Salon.Salon_owner_email,
					password: Salon.Salon_owner_password,
					phoneNumber: Salon.Salon_owner_phoneNumber,
					cnic: Salon.Salon_owner_cnic,
					salonname: Salon.Salon_Name,
					latitude: latLng.lat,
					longitude: latLng.lng,
					Salon_opening_hours: Salon_opening_hours,
					Salon_closing_hours: Salon_closing_hours,
				}
			)
			.then((response) => {
				ToastsStore.success(
					"Request submitted successfully.We will inform your account verification viva email",
					4000
				);
				this.setState({
					loading: false,
				});
				console.log("Response in OwnerSignup", response);
				setTimeout(() => {
					window.location = "/";
				}, 4000);
			})
			.catch((error) => {
				if (error.response) {
					ToastsStore.error(error.response.data);
					this.setState({
						loading: false,
					});
				}
			});
	};

	handle_opening_time_change = (time) => {
		this.setState({ Salon_opening_hours: time });
	};

	handle_closing_time_change = (time) => {
		this.setState({ Salon_closing_hours: time });
	};

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
		const {
			loading,
			Salon,
			error,
			Salon_opening_hours,
			Salon_closing_hours,
		} = this.state;
		return (
			<React.Fragment>
				<div> {loading && <ColorLinearProgress size={30} />}</div>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box color="indigo">
						<Typography component="h1" variant="h2" align="center" gutterBottom>
							Signup
						</Typography>
					</Box>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						Please signup as a salon owner
					</Typography>
					<TextField
						placeholder="Please enter your email"
						value={Salon.Salon_owner_email}
						onChange={this.handleChange}
						name="Salon_owner_email"
						label="email"
						error={error.Salon_owner_email}
						helperText={error.Salon_owner_email}
						style={{ marginTop: 15 }}
						fullWidth
						variant="outlined"
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								style={{ marginTop: 15 }}
								value={Salon.Salon_owner_firstName}
								onChange={this.handleChange}
								label="first name"
								fullWidth
								name="Salon_owner_firstName"
								error={error.Salon_owner_firstName}
								helperText={error.Salon_owner_firstName}
								placeholder="Please enter your firstname"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								value={Salon.Salon_owner_lastName}
								onChange={this.handleChange}
								style={{ marginTop: 15 }}
								name="Salon_owner_lastName"
								error={error.Salon_owner_lastName}
								helperText={error.Salon_owner_lastName}
								placeholder="Please enter your lastname"
								label="lastname"
								fullWidth
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<TextField
						variant="outlined"
						placeholder="Please enter your password"
						value={Salon.Salon_owner_password}
						onChange={this.handleChange}
						error={error.Salon_owner_password}
						helperText={error.Salon_owner_password}
						label="password"
						style={{ marginTop: 15 }}
						fullWidth
						type="password"
						name="Salon_owner_password"
					/>
					<TextField
						style={{ marginTop: 15 }}
						value={Salon.Salon_owner_cnic}
						onChange={this.handleChange}
						name="Salon_owner_cnic"
						label="cnic"
						fullWidth
						error={error.Salon_owner_cnic}
						helperText={error.Salon_owner_cnic}
						placeholder="Please enter your cnic"
						variant="outlined"
					/>
					<TextField
						style={{ marginTop: 15 }}
						value={this.state.Salon.Salon_owner_phoneNumber}
						onChange={this.handleChange}
						name="Salon_owner_phoneNumber"
						placeholder="Please enter your phone number"
						variant="outlined"
						fullWidth
						error={error.Salon_owner_phoneNumber}
						helperText={error.Salon_owner_phoneNumber}
						label="phone number"
					/>
					<PlacesAutocomplete
						value={this.state.Salon.Salon_Name}
						onChange={this.handleChangessalonserach}
						onSelect={this.handleSelect}
					>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div>
								<TextField
									style={{ marginTop: 15 }}
									{...getInputProps({
										placeholder: "Search Salon...",
										className: "location-search-input",
									})}
									name="Salon_Name"
									label="Salon Name"
									error={error.Salon_Name}
									helperText={error.Salon_Name}
									fullWidth
									variant="outlined"
								/>
								<div className="autocomplete-dropdown-container">
									{suggestions.map((suggestion) => {
										const className = suggestion.active
											? "suggestion-item--active"
											: "suggestion-item";
										const style = suggestion.active
											? { backgroundColor: "#fafafa", cursor: "pointer" }
											: { backgroundColor: "#ffffff", cursor: "pointer" };
										return (
											<div
												{...getSuggestionItemProps(suggestion, {
													className,
													style,
												})}
											>
												<span style={{ color: "indigo" }}>
													{suggestion.description}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
					<Paper
						elevation={8}
						style={{
							justifyContent: "center",
							flexGrow: 1,
							display: "flex",
							flexWrap: "wrap",
							marginTop: 15,
							marginBottom: 15,
						}}
					>
						<span style={{ padding: 10 }}>
							<Typography style={{ color: "indigo", marginRight: 15 }}>
								Starting time
							</Typography>
							<TimePicker
								label="select starting time"
								onChange={this.handle_opening_time_change}
								value={Salon_opening_hours}
								isOpen={false}
								clearIcon="Clear"
								clockAriaLabel="Toggle clock"
								clockIcon=""
								required={true}
							/>
						</span>

						<span style={{ padding: 10 }}>
							<Typography style={{ color: "indigo", marginRight: 15 }}>
								Closing time
							</Typography>
							<TimePicker
								onChange={this.handle_closing_time_change}
								value={Salon_closing_hours}
								isOpen={false}
								clearIcon="Clear"
								clockAriaLabel="Toggle clock"
								clockIcon=""
								required={true}
							/>
						</span>
					</Paper>
					<Button
						fullWidth
						style={{
							background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
							border: 0,
							borderRadius: 3,
							boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
							color: "white",
							height: 48,
							padding: "0 30px",
						}}
						color="primary"
						variant="contained"
						disabled={this.validate()}
						onClick={this.handleSubmit}
					>
						Signup
					</Button>
				</Container>
			</React.Fragment>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs",
})(OwnerSignup);
