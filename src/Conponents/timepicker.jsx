import React, { Component } from "react";
import TimePicker from "react-time-picker";

class Times extends Component {
	state = {
		time: "00:00"
	};

	onChange = time => {
		this.setState({ time });
		console.log(this.state.time);
	};

	render() {
		return (
			<div>
				<TimePicker
					onChange={this.onChange}
					value={this.state.time}
					isOpen={false}
					clearIcon="Clear"
					clockAriaLabel="Toggle clock"
					clockIcon=""
					required={true}
				/>
			</div>
		);
	}
}
export default Times;
