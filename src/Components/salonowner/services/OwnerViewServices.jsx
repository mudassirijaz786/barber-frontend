//importing
import React from "react";
import Axios from "axios";
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
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/salonservices",
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

  deleteService = (id) => {
    const { List_of_services } = this.state;
    const filteredList = List_of_services.filter((e) => e._id !== id);
    this.setState({ List_of_services: filteredList });
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/salonservices/" +
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
    const { isLoading, List_of_services } = this.state;
    return (
      <React.Fragment>
        <main>
          <div className={classes.heroContent}>
            {isLoading && <ColorLinearProgress size={30} />}
            <Container maxWidth="sm">
              <Box color="indigo">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {items.service_time}
                      </Typography>
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
                        to={{ pathname: "/services/edit", items: items }}
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
              {!isLoading && (
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
                    to="/services/add"
                    component={Link}
                    color="primary"
                    className={classes.margin}
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

OwnerViewServices.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting OwnerViewServices
export default withStyles(useStyles)(OwnerViewServices);
