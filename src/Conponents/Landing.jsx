import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
	root: {
		flexGrow: 1,
		justifyContent: "center",
		textAlign: "center"
	},

	button: {
		background: "linear-gradient(45deg, #020024 30%, #090979 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		height: 48,
		padding: "0 30px",
		marginRight: 5
	},
	h5: {
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			marginTop: theme.spacing(10)
		}
	},
	more: {
		marginTop: theme.spacing(2)
	}
});

class Landing extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid className={classes.root}>
				<Typography color="inherit" align="center" variant="h2" marked="center">
					Upgrade your Salons
				</Typography>
				<Typography
					color="inherit"
					align="center"
					variant="h5"
					className={classes.h5}
				>
					Enjoy secret offers up to -50% off the best luxury salon services
					every Sunday.
				</Typography>
				<Button
					color="secondary"
					variant="contained"
					size="large"
					component={Link}
					to="/signup"
					className={classes.button}
				>
					Register
				</Button>
				<Button
					color="secondary"
					variant="contained"
					size="large"
					component={Link}
					to="/login"
					className={classes.button}
				>
					Login
				</Button>
				<Typography
					variant="body2"
					color="inherit"
					align="center"
					className={classes.more}
				>
					Discover the experience
				</Typography>
			</Grid>
		);
	}
}

Landing.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
