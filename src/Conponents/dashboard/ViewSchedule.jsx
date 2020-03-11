import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  card: {
    border: "2px solid indigo",
    margin: 10
  },
  button: {
    minWidth: 200
  }
});
class ViewSchedule extends React.Component {
  state = {
    Appointment: [{ date: "2020-03-09", start: "10:30 AM", end: "11:30 AM" }]
  };

  render() {
    const { classes } = this.props;
    if (this.state.Appointment.length === 0) {
      return <h2>You have no serive to display </h2>;
    }
    return this.state.Appointment.map(items => {
      return (
        <Grid center container spacing={3} className={classes.root}>
          <Grid item center xs={10} sm={4} lg={4} md={4} spacing={10}>
            {" "}
            <Card item lg={6} xs={6} className={classes.card}>
              <CardHeader
                title="Salon name here"
                subheader="Service name here"
              />
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {items.date}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Start: {items.start}
                    <br></br>
                    End: {items.end}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  ariant="body2"
                  style={{ cursor: "pointer" }}
                >
                  BUTTON
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    });
  }
}

ViewSchedule.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewSchedule);
