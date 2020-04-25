import React from "react";
import Axios from "axios";
//importing
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import {
  LinearProgress,
  makeStyles,
  IconButton,
  Typography,
  Container,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Grid,
  Button,
} from "@material-ui/core";

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
  heroButtons: {
    marginTop: theme.spacing(4),
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

//class AdminViewService
class AdminViewService extends React.Component {
  state = {
    List_of_services: [],
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
        console.log("Response in AdminViewService", response);
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
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                All Services
              </Typography>
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
              {List_of_services.map((items) => (
                <Grid item key={items} xs={12} sm={6} md={4}>
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
                      <Button size="small" color="primary">
                        <DeleteIcon
                          onClick={() => this.deleteService(items._id)}
                        />
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={{ pathname: "/admin/services/edit", items: items }}
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
              {!loading && (
                <Grid item xs={12} sm={6} md={4}>
                  <IconButton
                    aria-label="add"
                    to="/admin/services/add"
                    component={Link}
                    color="primary"
                    className={classes.margin}
                    size="large"
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

AdminViewService.propTypes = {
  classes: PropTypes.object.isRequired,
};

// exporting AdminViewService
export default withStyles(useStyles)(AdminViewService);
