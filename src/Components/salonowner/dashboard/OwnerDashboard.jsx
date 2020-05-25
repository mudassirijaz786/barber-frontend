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
};

//class OwnerDashboard
class OwnerDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Box color="indigo">
          <Typography variant="h3">Owner Dashboard</Typography>
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
