//importing
import React, { Component } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
	Box,
	Container,
	makeStyles,
	Grid,
	Typography,
	Avatar,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CardActionArea,
} from "@material-ui/core";

//styling
const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	timingSpan: { color: "indigo" },
}));

//class Schedule
class Schedule extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		date: new Date(),
		schedule: [],
	};

	handleonChange = (date) => {
		// this.setState({ date }, () => {
		// 	this.afterStateupdatedfinished();
		// });
		this.afterStateupdatedfinished(date);
	};

	afterStateupdatedfinished = (date) => {
		//const { date } = this.state;
		//	console.log("state  date", this.state.date);

		console.log("is date", date);
		const url = `http://localhost:5000/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;

		//const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;
		axios({
			url: url,
			method: "GET",
			headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
		})
			.then((response) => {
				if (typeof response.data === "string") {
					//console.log("Response in Schedule", response.data);
					//	this.setState({ schedule: [] });
				} else {
					console.log("data sis ", response.data);
					this.setState({ schedule: response.data });
				}
			})
			.catch((error) => {
				alert(error);
			});
	};

	componentDidMount() {
		const token = localStorage.getItem("x-auth-token");
		console.log("Token in Schedule page", token);
		//	console.log("date is ", this.state.date);
		const date = new Date();
		//const { date } = this.state;
		console.log("date is ", date);
		console.log("state is ", this.state.schedule);
		const url = `http://localhost:5000/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;
		//const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;
		axios({
			url: url,
			method: "GET",
			headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
		})
			.then((response) => {
				console.log("Response in Schedule", response.data);

				if (typeof response.data === "string") {
					//		console.log("Response in Schedule", response.data);
				} else {
					this.setState({ schedule: response.data });
				}
			})
			.catch((error) => {
				if (error.response) {
					alert(error.response.data);
				}
			});
	}

	render() {
		const { classes } = this.props;
		const { schedule, date } = this.state;
		return (
			<React.Fragment>
				<main>
					<div className={classes.heroContent}>
						<Container component="main" maxWidth="xs">
							<Box color="indigo">
								<Typography
									component="h1"
									variant="h2"
									align="center"
									gutterBottom
								>
									Schedule
								</Typography>
							</Box>
							<Calendar onChange={this.handleonChange} value={date}></Calendar>
							{schedule.length === 0 ? (
								<Typography
									variant="h5"
									align="center"
									color="textSecondary"
									paragraph
								>
									Sorry, no schedule for today
								</Typography>
							) : (
								<Typography
									variant="h5"
									align="center"
									color="textSecondary"
									paragraph
								>
									Following is list of schedule if any
								</Typography>
							)}
						</Container>
					</div>
					<Container maxWidth="md">
						<Grid container spacing={4}>
							{schedule.map((items) => (
								<Grid item key={items} xs={12} sm={6} md={4}>
									<Card key={items._id} className={classes.card}>
										<CardHeader
											avatar={<Avatar aria-label="recipe">date</Avatar>}
											title={items.booking_date}
										/>
										<CardActionArea>
											<CardContent>
												<Typography
													variant="h6"
													color="textSecondary"
													component="p"
												>
													<span className={classes.timingSpan}>
														Starting Time:
													</span>
													{items.stating_time}
												</Typography>
												<Typography
													variant="h6"
													color="textSecondary"
													component="p"
												>
													<span className={classes.timingSpan}>
														Ending Time:
													</span>
													{items.ending_time}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions disableSpacing>
											<Typography variant="h6" component="h6" gutterBottom>
												Service: {items.Salon_id}
											</Typography>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
			</React.Fragment>
		);
	}
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
};

// exporting Schedule
export default withStyles(useStyles)(Schedule);
