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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
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
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
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
              <Calendar
                onChange={this.handleonChange}
                value={this.state.date}
              ></Calendar>
              {this.state.sechedule.length === 0 ? (
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
                  Following is list of schedule if any
                </Typography>
              )}
            </Container>
          </div>

          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {this.state.sechedule.map((items) => (
                <Grid item key={items} xs={12} sm={6} md={4}>
                  <Card key={items._id} className={classes.card}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">date</Avatar>}
                      title={items.booking_date}
                    />
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          <span style={{ color: "indigo" }}>
                            Starting Time:{" "}
                          </span>{" "}
                          {items.stating_time}
                        </Typography>

                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          <span style={{ color: "indigo" }}>Ending Time: </span>{" "}
                          {items.ending_time}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions disableSpacing>
                      <Typography variant="h6" component="h6" gutterBottom>
                        Service: {items.Salon_id}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* End hero unit */}
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Schedule);
