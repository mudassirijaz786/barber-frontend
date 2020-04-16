import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import Decode from "jwt-decode";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProgressSpinner } from "primereact/progressspinner";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	card: {
		border: "2px solid indigo",
		margin: 10,
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
});
class ServicesViewAdmin extends React.Component {
	state = {
		List_of_services: [],
		name: "mudassir",
		loading: true,
	};

	componentDidMount() {
		this.loadData();
	}
	loadData() {
		Axios({
			url:
				"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/recomended_services",
			method: "GET",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-auth-token": localStorage.getItem("x-auth-token"),
			},
		})
			.then((response) => {
				console.log("RESPONSE OBJECT", response);
				// List_of_services = { ...this.state.List_of_services0 };
				// List_of_services = response;
				this.setState({ List_of_services: response.data, loading: false });
			})

			// console.log("IN COMPONENT DID MOUNT", this.state.name);

			.catch(function (error) {
				if (error.response) {
					alert(error.response.data);
				}
			});
	}

	deleteService(id) {
		const List_of_services = this.state.List_of_services.filter(
			(e) => e._id !== id
		);
		console.log("list of salon after acceptance", List_of_services);
		this.setState({ List_of_services });

		Axios({
			url:
				"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/recomended_services/" +
				id,
			method: "DELETE",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-auth-token": localStorage.getItem("x-auth-token"),
			},
		})
			.then((res) => {
				const { List_of_services } = this.state;
				const result = List_of_services.filter((item) => item._id !== id);
				this.setState({ List_of_services: result });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	editService() {
		console.log("EDIT SERVICE CLICK EVENT");
	}
	render() {
		console.log("decode", Decode(localStorage.getItem("x-auth-token")));
		const { classes } = this.props;
		console.log("STATE", this.state.List_of_services);
		return (
			<React.Fragment className={classes.root}>
				<h2 style={{ textAlign: "center" }}>Services</h2>

				<Grid container spacing={3} maxWidth="lg">
					{this.state.List_of_services.length === 0 && (
						<Grid item xs={6}>
							<h2 style={{ textAlign: "center" }}>
								No recomended service available
							</h2>
						</Grid>
					)}
					{this.state.List_of_services.length !== 0 &&
						this.state.List_of_services.map((items) => {
							return (
								<div>
									{this.state.isLoading ? (
										<ProgressSpinner />
									) : (
										<Grid item xs={6}>
											<Card
												items
												style={{
													height: 450,
													width: 400,
													margin: 20,
													border: "2px solid indigo",
												}}
											>
												<CardHeader
													avatar={
														<Avatar
															aria-label={items.serviceName}
															className={classes.avatar}
															src={items.image_url}
														></Avatar>
													}
													action={<IconButton>{items.service_time}</IconButton>}
													title={items.serviceName}
													subheader={items.service_category}
												/>
												<CardMedia
													style={{
														height: 0,
														paddingTop: "56.25%", // 16:9,
														marginTop: "30",
													}}
													className={classes.cover}
													image={items.image_url}
													title={items.serviceName}
												/>

												<CardContent>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p"
													>
														{items.serviceDescription}
													</Typography>
												</CardContent>
												<CardActions disableSpacing>
													<DeleteIcon
														onClick={() => this.deleteService(items._id)}
													/>
													<Link
														to={{
															pathname: "/admin/services/edit",
															id: items._id,
														}}
													>
														<EditIcon />
													</Link>
													<Link
														to={{ pathname: "/services/add", id: items._id }}
													>
														<ExpandMoreIcon />
													</Link>

													<IconButton>
														<Typography
															variant="h4"
															color="textSecondary"
															style={{ textAlign: "right" }}
														>
															{items.servicePrice} Rs
														</Typography>
													</IconButton>
												</CardActions>
											</Card>
										</Grid>
									)}
								</div>
							);
						})}
					<Grid item xs={6}>
						<Button
							style={{ marginLeft: 10 }}
							color="primary"
							variant="contained"
							size="large"
							component={Link}
							to="/admin/services/add"
							className={classes.button}
						>
							Add service
						</Button>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

ServicesViewAdmin.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesViewAdmin);
