//importing
import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { ToastsStore } from "react-toasts";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  LinearProgress,
  makeStyles,
  Box,
  Grid,
  Button,
  Container,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
  Card,
} from "@material-ui/core";
import { url } from "../../../../src/config.json";

//styling
const useStyles = makeStyles((theme) => ({
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",

    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
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

//class Salon
class Salon extends React.Component {
  state = {
    List_of_salons: [123],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadData();
  }

  loadData = () => {
    console.log(url);
    Axios({
      url: url + "/superadmin",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        this.setState({ List_of_salons: response.data, isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
        }
      });
  };

  acceptSalon = (id) => {
    const { List_of_salons } = this.state;
    const filteredList = List_of_salons.filter((e) => e._id !== id);
    this.setState({ List_of_salons: filteredList });
    Axios({
      url: url + "/superadmin/" + id,
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        ToastsStore.success("salon got accepted");
      })
      .catch((error) => {
        if (error.response) {
          ToastsStore.error("Error in getting salons from backend");
        }
      });
  };

  rejectSalon = (id) => {
    const { List_of_salons } = this.state;
    const filteredList = List_of_salons.filter((e) => e._id !== id);
    this.setState({ List_of_salons: filteredList });
    Axios({
      url: url + "/superadmin/" + id,
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        ToastsStore.error("salon got rejected");
      })

      .catch((error) => {
        if (error.response) {
          ToastsStore.error(error.response.data);
        }
      });
  };

  submitAccept = (id) => {
    confirmAlert({
      title: `You have clicked on accept salon`,
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.acceptSalon(id),
        },
        {
          label: "No",
          onClick: () => ToastsStore.error("operation cancelled"),
        },
      ],
    });
  };

  submitReject = (id) => {
    confirmAlert({
      title: `You have clicked on reject`,
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.rejectSalon(id),
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
    const { List_of_salons, isLoading } = this.state;
    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            <div>{isLoading && <ColorLinearProgress size={30} />}</div>
            <Container maxWidth="sm">
              <Box color="indigo">
                <Typography variant="h3" align="center">
                  Salons Request
                </Typography>
              </Box>
              {!isLoading && (
                <div>
                  {List_of_salons.length === 0 ? (
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
                      salons requests are listed below
                    </Typography>
                  )}
                </div>
              )}
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
              {!isLoading && (
                <Grid container spacing={4}>
                  {List_of_salons.map((items) => (
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
                          <Button
                            size="medium"
                            variant="contained"
                            style={{
                              marginRight: 80,
                              color: "white",
                              backgroundColor: "green",
                            }}
                            onClick={() => this.submitAccept(items._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="medium"
                            variant="contained"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={() => this.submitReject(items._id)}
                          >
                            Reject
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Salon.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting Salon
export default withStyles(useStyles)(Salon);
