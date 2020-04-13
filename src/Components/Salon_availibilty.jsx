import React, { Component } from "react";
import Switch from "react-switch";

import Button from "@material-ui/core/Button";

class SwitchExample extends Component {
	constructor() {
		super();
		this.state = { checked: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit = e => {
		console.log(this.state.checked);
	};
	handleChange(checked) {
		this.setState({ checked });
		
	}

	render() {
		return (
			<label>
				<span>Switch with default style</span>
				<Switch onChange={this.handleChange} checked={this.state.checked} />
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={this.handleSubmit}
				>
					Add service
				</Button>
			</label>
		);
	}
}

export default SwitchExample;
