import React, { Component } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "primereact/resources/primereact.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { ProgressSpinner } from "primereact/progressspinner";

import PropTypes from "prop-types";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 10,
  },
  control: {
    padding: 10,
  },
  button: {
    background: "linear-gradient(45deg, #020024 30%, #090979 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  fields: {
    marginTop: 15,
  },
  error: {
    color: "red",
  },
  backendErrorStyle: {
    color: "red",
    textAlign: "center",
  },
  card: {
    margin: 20,
    border: "2px solid indigo",
    flexGrow: 1,
    justifyContent: "center",
  },
  paperStyle: {
    margin: "2px",
    textAlign: "center",
    color: "black",
    marginTop: 30,
  },
});
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      sechedule: [],
    };
  }

  handleonChange = (date) => {
    this.setState({ date }, () => {
      this.afterStateupdatedfinished();
    });
  };

  afterStateupdatedfinished = () => {
    console.log("after state updated is called", this.state.date);
    const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${this.state.date}`;
    axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        if (typeof response.data === "string") {
          console.log("response is", response.data);
          this.setState({ sechedule: [] });
        } else {
          this.setState({ sechedule: response.data });
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };
  componentDidMount() {
    const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${this.state.date}`;
    axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        if (typeof response.data === "string") {
          console.log("response is", response.data);
        } else {
          this.setState({ sechedule: response.data });
        }
      })

      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  render() {
    console.log("STATE IS", this.state.sechedule);

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid center container spacing={3} className={classes.root}>
          <Grid item center xs={8} sm={8} lg={4} md={4} spacing={10}>
            <Calendar
              onChange={this.handleonChange}
              value={this.state.date}
            ></Calendar>
          </Grid>
        </Grid>

        {this.state.sechedule.length !== 0 && (
          <Grid center container className={classes.root}>
            {/* <Grid item center xs={8} sm={8} lg={12} md={8} spacing={10}> */}
            <div className={classes.root}>
              <Grid container maxWidth="lg">
                {this.state.sechedule.map((items) => {
                  return (
                    <Grid item xs={10} sm={10} lg={6} md={10}>
                      {this.state.loading ? (
                        <ProgressSpinner />
                      ) : (
                        <Card key={items._id} className={classes.card}>
                          <CardHeader
                            avatar={<Avatar aria-label="recipe">date</Avatar>}
                            title={items.booking_date}
                          />
                          <CardActionArea>
                            <CardContent>
                              <Typography
                                variant="h5"
                                color="textSecondary"
                                component="p"
                              >
                                <span style={{ color: "indigo" }}>
                                  Starting Time:{" "}
                                </span>{" "}
                                {items.stating_time}
                              </Typography>

                              <Typography
                                variant="h5"
                                color="textSecondary"
                                component="p"
                              >
                                <span style={{ color: "indigo" }}>
                                  Ending Time:{" "}
                                </span>{" "}
                                {items.ending_time}
                              </Typography>
                            </CardContent>
                          </CardActionArea>

                          <CardActions disableSpacing>
                            <Typography
                              variant="h6"
                              component="h6"
                              gutterBottom
                            >
                              Service: {items.Salon_id}
                            </Typography>
                          </CardActions>
                        </Card>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            {/* </Grid> */}
          </Grid>
        )}
        {this.state.sechedule.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No appointment today </h2>
        )}
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);
