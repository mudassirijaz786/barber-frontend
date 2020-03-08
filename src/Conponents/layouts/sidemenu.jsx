import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
class Sidebar extends Component {
	state = {
		date: new Date()
	};
	handleSubmit = e => {
		window.location.href = `schedule/:${this.state.date}`;
	};
	render() {
		return (
			<div className="container">
				<Button
					fullWidth
					style={{ marginBottom: 6 }}
					variant="contained"
					color="primary"
					className="p-button-raised p-button-rounded"
					onClick={this.handleSubmit}
				>
					Login
				</Button>
			</div>
		);
	}
}
export default Sidebar;
