import React, { Component } from "react";
import { Button } from "primereact/button";
import Moment from "react-moment";

class Time extends Component {
	state = {
		a: "12",
		b: "45",
		d: "AM",
		c: ""
	};

	render() {
		return (
			<h1>
				{this.state.c}
				<Button
					//variant="contained"
					//color="primary"
					fullWidth
					// disabled={this.validate()}
					onClick={this.fun}
					label="Add Service"
					className="p-button-raised p-button-rounded"
				/>
			</h1>

			/*
			// 	<Button
			// 		//variant="contained"
			// 		//color="primary"
			// 		fullWidth
			// 		// disabled={this.validate()}
			// 		onClick={this.fun2}
			// 		label="Add Service"
			// 		className="p-button-raised p-button-rounded"
            // 	/>
			//    const	dateToFormat = '1976-04-19T12:59-0500';
            // <Moment>{dateToFormat}</Moment>
     */
		);
	}
	fun = () => {
		//console.log(moment.fn.format);
		const h = this.state.a;
		const i = this.state.b;
		const j = this.state.d;
		const f = i + ":" + h + " " + j;
		this.setState({ c: f });
	};
}

export default Time;
