//importing
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles, Typography, LinearProgress } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import axios from "axios";

//styling
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

//Loading Indicator
const ColorLinearProgress = withStyles({
	colorPrimary: {
		backgroundColor: "#b2dfdb",
	},
	barColorPrimary: {
		backgroundColor: "#00695c",
	},
})(LinearProgress);

//class Chart
class Charts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			days: "",
			isLoading: false,
		};
	}

	//handling chart
	handleChange = (event) => {
		this.setState({ days: event.target.value });
		this.setState({ isLoading: true });
		const url =
			"https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/reports";

		axios({
			url: url,
			method: "GET",
			headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
		})
			.then((response) => {
				this.setState({ isLoading: false });
				this.getData(response, "Appiontments", this.state.days);
			})
			.catch((error) => {
				this.setState({ isLoading: false });
				alert(error);
			});
	};

	//getting chart data and display it
	getData = (result, graphLabel, days) => {
		const d = Object.entries(result.data).reverse().slice(0, days).reverse();
		let labels = [];
		let data = [];
		d.forEach((o) => {
			labels.push(o[1]._id.split("T")[0]);
			data.push(o[1].count);
		});
		const stats = {
			labels,
			datasets: [
				{
					fill: false,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					label: graphLabel,
					data: data,
				},
			],
		};

		//setting data to state
		this.setState({ data: stats });
	};

	//rendering
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.formControl}>
				<div> {this.state.isLoading && <ColorLinearProgress size={30} />}</div>
				<InputLabel id="demo-simple-select-label">
					{this.state.days === 7 || this.state.days === 29 ? (
						<Typography> Showing {this.state.days} days report</Typography>
					) : (
						<Typography> Select to see reports</Typography>
					)}
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={this.state.days}
					onChange={this.handleChange}
				>
					<MenuItem value={7}>weekly</MenuItem>
					<MenuItem value={29}>monthly</MenuItem>
				</Select>

				<Line data={this.state.data} height={100} />
				<Pie data={this.state.data} height={100} />
			</div>
		);
	}
}

Charts.propTypes = {
	classes: PropTypes.object.isRequired,
};

//exporting Charts
export default withStyles(useStyles)(Charts);
