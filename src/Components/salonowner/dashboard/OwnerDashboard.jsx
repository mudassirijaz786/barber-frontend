//importing
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Typography, withStyles } from "@material-ui/core";
import Charts from "./Charts";

//styling
const styles = {
	root: {
		flexGrow: 1,
		justifyContent: "center",
		textAlign: "center",
	},
	button: {
		background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		height: 48,
		padding: "0 30px",
	},
};

//class OwnerDashboard
class OwnerDashboard extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Box color="indigo">
					<Typography variant="h2">This is dashboard for Admin</Typography>
					<Charts />
				</Box>
			</div>
		);
	}
}

OwnerDashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

//exporting OwnerDashboard
export default withStyles(styles)(OwnerDashboard);
