//importing
import React, { Component } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  Close as CloseIcon,
  Check as CheckIcon,
  ThreeSixty,
} from "@material-ui/icons";
import Axios from "axios";
import { ToastsStore } from "react-toasts";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

//styling
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  timingSpan: { color: "indigo" },
}));

//class Schedule
class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    date: new Date(),
    schedule: [],
    service_status: false,
  };

  handleonChange = (date) => {
    // this.setState({ date }, () => {
    // 	this.afterStateupdatedfinished();
    // });
    this.afterStateupdatedfinished(date);
  };

  afterStateupdatedfinished = (date) => {
    //const { date } = this.state;
    //	console.log("state  date", this.state.date);

    console.log("is date", date);
    //const url = `http://localhost:5000/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;

    const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;
    axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        if (typeof response.data === "string") {
          //console.log("Response in Schedule", response.data);
          this.setState({ schedule: [] });
        } else {
          console.log("data sis ", response.data);
          this.setState({ schedule: response.data });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const date = new Date();
    const url = `https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/Saloon_owner/schedule/:${date}`;
    axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        console.log("Response in Schedule", response.data);

        if (typeof response.data === "string") {
        } else {
          this.setState({ schedule: response.data });
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  availed = async (id) => {
    await this.setState({ service_status: true });
    let form_data = new FormData();
    form_data.append("service_status", this.state.service_status);
    await axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/service/status/" +
        id,
      method: "POST",
      data: form_data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          ToastsStore.success("Appointment status set to availed");
        }
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Error occured");
        }
      });
  };

  notAvailed = async (id) => {
    await axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/customer/unavailed/service/" +
        id,
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          ToastsStore.success("appointment is not Availed yet");
          const { schedule } = this.state;
          const filteredList = schedule.filter((e) => e._id !== id);
          this.setState({ schedule: filteredList });
        }
      })

      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);
        }
      });
  };

  submitNotAvailed = (id) => {
    confirmAlert({
      title: `You have clicked Not availed it `,
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.notAvailed(id),
        },
        {
          label: "No",
          onClick: () => ToastsStore.error("operation cancelled"),
        },
      ],
    });
  };

  submitAvailed = (id) => {
    confirmAlert({
      title: `You have clicked availed it`,
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.availed(id),
        },
        {
          label: "No",
          onClick: () => ToastsStore.error("operation cancelled"),
        },
      ],
    });
  };

  render() {
    const { classes } = this.props;
    const { schedule, date } = this.state;
    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            <Container component="main" maxWidth="xs">
              <Box color="indigo">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  Schedule
                </Typography>
              </Box>
              <Calendar onChange={this.handleonChange} value={date}></Calendar>
              {schedule.length === 0 ? (
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Sorry, no schedule for today
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Following is list of schedule
                </Typography>
              )}
            </Container>
          </div>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {schedule.map((items) => (
                <Grid item key={items} xs={12} sm={6} md={4}>
                  <Card key={items._id} className={classes.card}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">date</Avatar>}
                      title={items.booking_date}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                      >
                        {items.stating_time} to {items.ending_time}
                      </Typography>
                      <Typography variant="h6" component="h6" gutterBottom>
                        Service: {items.service_id}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="medium"
                        variant="contained"
                        style={{
                          marginRight: 80,
                          color: "white",
                          backgroundColor: "green",
                        }}
                        onClick={() => this.submitAvailed(items._id)}
                      >
                        Avail
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => this.submitNotAvailed(items._id)}
                      >
                        Not Avail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

// exporting Schedule
export default withStyles(useStyles)(Schedule);
