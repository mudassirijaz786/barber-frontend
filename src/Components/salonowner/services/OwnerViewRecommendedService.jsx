//importing
import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@material-ui/icons";
import {
  LinearProgress,
  IconButton,
  Typography,
  Container,
  makeStyles,
  Box,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Grid,
  Button,
} from "@material-ui/core";

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

//class OwnerViewRecommendedService
class OwnerViewRecommendedService extends React.Component {
  state = {
    List_of_services: [],
    name: "mudassir",
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.loadData();
  }
  loadData = async () => {
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/recomended_services",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((response) => {
        console.log("Response in OwnerAddRecommendedService", response);
        this.setState({ List_of_services: response.data, loading: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ loading: false });
        }
      });
  };

  deleteService = (id) => {
    const { List_of_services } = this.state;
    const filteredList = List_of_services.filter((e) => e._id !== id);
    this.setState({ List_of_services: filteredList });
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/recomended_services/" +
        id,
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
        alert(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { loading, List_of_services } = this.state;
    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            <div>{loading && <ColorLinearProgress size={30} />}</div>
            <Container maxWidth="sm">
              <Box color="indigo">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  All Recommended Services
                </Typography>
              </Box>
              {!loading && (
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
                      action={`Timing ${items.service_time}`}
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
                    <CardContent>
                      <Typography>{items.serviceDescription}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={{ pathname: "/services/edit", items: items }}
                      >
                        <span style={{ color: "black" }}>
                          Add to your salon
                        </span>
                        <AddIcon fontSize="large" />
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
              {!loading && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    Want to add another?
                  </Typography>
                  <IconButton
                    aria-label="add"
                    to="/admin/services/add"
                    component={Link}
                    color="primary"
                    size="medium"
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

OwnerViewRecommendedService.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerViewRecommendedService
export default withStyles(useStyles)(OwnerViewRecommendedService);
