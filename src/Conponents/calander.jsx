import React, { Component } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "primereact/resources/primereact.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			sechedule: [],
			options: {
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultView: "timeGridDay",
				defaultDate: "2020-03-09",
				header: {
					left: "prev,next",
					center: "title",
					right: "timeGridDay"
				},
				editable: false
			}
		};
	}

	handleonChange = date => {
		this.setState({ date }, () => {
			this.afterStateupdatedfinished();
		});
	};

	afterStateupdatedfinished = () => {
		//	console.log(this.state.date);
		//console.log(this.state.sechedule);
		//	console.log("the schedile is ", this.state.sechedule);
		console.log("after state is called is called");
		const url = `http://localhost:5000/Digital_Saloon.com/api/Saloon_owner/schedule/:${this.state.date}`;
		axios({
			//	"https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/salonservices",
			//"http://localhost:5000/Digital_Saloon.com/api/salonservices",`/schedule/:${this.state.date}`
			url: url,
			method: "GET",
			headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
		})
			.then(response => {
				console.log("the state is", this.state.sechedule);
				this.setState({ sechedule: response.data });
				// if (typeof response.data === "string") {
				// 	//	console.log("response is ", response.data);
				// 	this.setState({ sechedule: response.data });
				// } else {
				// 	this.setState({ sechedule: response.data });
				// }
				// if (this.state.sechedule.length == 0) {
				// 	this.setState({ sechedule: response.data });
				// } else {
				// 	console.log("schedule is ", this.state.sechedule);
				// 	console.log("response is ", response.data);

				// 	console.log(this.objectsEqual(this.state.sechedule, response.data));
				// }
				//console.log(this.state.sechedule);
				// } else if (this.state.sechedule != response.data) {
				// 	console.log("schedule is ", this.state.sechedule);
				// 	console.log("response is ", response.data);

				// 	console.log("both are not equal");
				// } else {
				// 	console.log("NO changw");
				// }

				// 	if (this.state.sechedule !== response.data)
				// 		this.setState({ sechedule: response.data });
				// }
				// if (response.data) {
				// 	//console.log(response.data);
				// 	//	console.log(previousstate);
				// 	//	console.log(response.data);
				// 	//	console.log(previousstate.sechedule);
				// 	//	if (this.state.sechedule !== response.data) {
				// 	//		this.setState({ sechedule: response.data });
				// 	//		}
				// }
				//	console.log(req.headers);
				//console.log(response);
			})
			.catch(function(error) {
				alert(error);
			});
		//this.props.history.push("/");
		//console.log(this.state.date);
	};
	componentDidMount() {
		//	console.log("component did mount is called");
		//	console.log(this.state.date);

		const url = `http://localhost:5000/Digital_Saloon.com/api/Saloon_owner/schedule/:${this.state.date}`;
		axios({
			url: url,
			//   "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/salonservices",
			method: "GET",
			headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
		})
			.then(response => {
				// if (response.data) {
				// 	this.setState({ Schedule: response.data });
				// }
				if (typeof response.data === "string") {
					//	console.log("response is", response.data);
					//	this.setState({ sechedule: response.data });
				} else {
					this.setState({ sechedule: response.data });
				}
			})

			.catch(function(error) {
				if (error.response) {
					alert(error.response.data);
				}
			});
	}

	render() {
		if (this.state.sechedule.length == 0) {
			return (
				<div className="container">
					<Calendar
						onChange={this.handleonChange}
						value={this.state.date}
					></Calendar>
					<h2>No appointment today </h2>;
				</div>
			);
		}

		return (
			<div>
				<Calendar
					onChange={this.handleonChange}
					value={this.state.date}
				></Calendar>
			</div>
		);
	}
}

export default Schedule;
