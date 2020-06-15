//importing
import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { ToastsStore } from "react-toasts";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  LinearProgress,
  makeStyles,
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
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
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

//class OwnerViewServices
class OwnerViewServices extends React.Component {
  state = {
    List_of_services: [],
    name: "mudassir",
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadData();
  }

  loadData = async () => {
    await Axios({
      url: url + "/salonservices",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        this.setState({
          isLoading: false,
          List_of_services: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
        }
      });
  };

  confirmBeforeDeletion = (id) => {
    confirmAlert({
      title: `You have clicked on deletion of service`,
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteService(id),
        },
        {
          label: "No",
          onClick: () => ToastsStore.error("operation cancelled"),
        },
      ],
    });
  };

  deleteService = (id) => {
    const { List_of_services } = this.state;
    const filteredList = List_of_services.filter((e) => e._id !== id);
    this.setState({ List_of_services: filteredList });
    Axios({
      url: url + "/salonservices/" + id,
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((res) => {
        const { List_of_services } = this.state;
        const result = List_of_services.filter((item) => item._id !== id);
        this.setState({ List_of_services: result });
      })
      .catch((err) => {
        ToastsStore.error("Error in deletion");
      });
  };

  render() {
    const { classes } = this.props;
    const { isLoading, List_of_services } = this.state;
    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            {isLoading && <ColorLinearProgress size={30} />}
            <Container maxWidth="sm">
              <Box color="indigo">
                <Typography variant="h3" align="center">
                  All services
                </Typography>
              </Box>
              {!isLoading && (
                <div>
                  {List_of_services.length === 0 ? (
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      No service to display
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      All services are listed below
                    </Typography>
                  )}
                </div>
              )}
            </Container>
          </div>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {List_of_services.map((items, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card elevation={20}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label={items.serviceName}
                          src={items.image_url}
                        />
                      }
                      action={items.service_time}
                      title={items.serviceName}
                      subheader={items.service_category}
                    />
                    <CardMedia
                      style={{
                        height: 0,
                        paddingTop: "56.25%",
                        marginTop: "30",
                      }}
                      image={items.image_url}
                      title={items.serviceName}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h6">
                        Service Time: {items.service_time} minutes
                      </Typography>
                      <Typography style={{ color: "green" }}>
                        Rating: {items.ServiceAvgRating}
                      </Typography>
                      <Typography>{items.serviceDescription}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" style={{ color: "red" }}>
                        <DeleteIcon
                          onClick={() => this.confirmBeforeDeletion(items._id)}
                        />
                      </Button>
                      <Button
                        size="small"
                        style={{ color: "green" }}
                        component={Link}
                        to={{ pathname: "/services/update", items: items }}
                      >
                        <EditIcon />
                      </Button>
                      <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                      >
                        {items.servicePrice} Rs
                      </Typography>
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

OwnerViewServices.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerViewServices
export default withStyles(useStyles)(OwnerViewServices);
