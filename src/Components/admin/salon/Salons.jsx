import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import Decode from "jwt-decode";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);
class CardMaterial extends React.Component {
  state = {
    List_of_salons: [123],
    name: "mudassir",
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.loadData();
  }
  loadData = () => {
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("RESPONSE OBJECT", response);
        // List_of_services = { ...this.state.List_of_services0 };
        // List_of_services = response;
        this.setState({ List_of_salons: response.data, isLoading: false });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
        }
      });
  };

  acceptSalon = (id) => {
    console.log(id);
    const List_of_salons = this.state.List_of_salons.filter(
      (e) => e._id !== id
    );
    console.log("list of salon after acceptance", List_of_salons);
    this.setState({ List_of_salons });
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin/" +
        id,
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("RESPONSE OBJECT", response);
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
    console.log("Accept salon CLICK EVENT");
  };

  rejectSalon = (id) => {
    const List_of_salons = this.state.List_of_salons.filter(
      (e) => e._id !== id
    );
    console.log("list of salon after deletion", List_of_salons);
    this.setState({ List_of_salons });

    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/superadmin/" +
        id,
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("RESPONSE OBJECT", response);
      })

      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
    console.log("Reject Salon CLICK EVENT");
  };
  render() {
    const { classes } = this.props;
    const { List_of_salons } = this.state;
    console.log("Response in state", List_of_salons);
    console.log("STATE", this.state.List_of_salons);
    return (
      <React.Fragment className={classes.root}>
        <main>
          <div className={classes.heroContent}>
            <div>
              {this.state.isLoading && <ColorLinearProgress size={30} />}
            </div>

            <Container maxWidth="sm">
              <Box color="indigo">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  All Salons
                </Typography>
              </Box>

              {!this.state.isLoading && (
                <div>
                  {this.state.List_of_salons.length === 0 ? (
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      No Salon to display
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      All salons are listed below
                    </Typography>
                  )}
                </div>
              )}
            </Container>

            <Container className={classes.cardGrid} maxWidth="md">
              {!this.state.isLoading && (
                <Grid container spacing={4}>
                  {this.state.List_of_salons.map((items) => (
                    <Grid item key={items} xs={12} sm={6} md={4}>
                      <Card className={classes.card} elevation={20}>
                        <CardHeader
                          action={items.service_time}
                          title={items.SalonName}
                          subheader={items.service_category}
                        />

                        <CardContent className={classes.cardContent}>
                          <Typography>
                            <span style={{ color: "indigo" }}>
                              Phone number:
                            </span>
                            {items.SalonOwnerphoneNumber}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h2">
                            {items.Salon_owner_firstName}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            size="large"
                            color="primary"
                            onClick={() => this.acceptSalon(items._id)}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton size="large" color="secondary">
                            <CloseIcon
                              onClick={() => this.rejectSalon(items._id)}
                            />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* End hero unit */}
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

CardMaterial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CardMaterial);
