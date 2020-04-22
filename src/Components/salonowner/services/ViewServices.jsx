import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import Decode from "jwt-decode";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import decode from "jwt-decode";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddIcon from "@material-ui/icons/Add";
import Authorization from "../../common/Authorization";

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
    List_of_services: [],
    name: "mudassir",
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.loadData();
  }
  loadData() {
    Axios({
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
        this.setState((prevState) => ({
          isLoading: false,
          List_of_services: response.data,
        }));
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false });
        }
      });
  }

  deleteService(id) {
    const List_of_services = this.state.List_of_services.filter(
      (e) => e._id !== id
    );
    console.log("list of salon after acceptance", List_of_services);
    this.setState({ List_of_services });
    console.log(id);
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
        console.log(err);
      });
  }

  editService() {
    console.log("EDIT SERVICE CLICK EVENT");
  }
  render() {
    console.log("decode", Decode(localStorage.getItem("x-auth-token")));
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            {this.state.isLoading && <ColorLinearProgress size={30} />}
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
              {!this.state.isLoading && (
                <div>
                  {this.state.List_of_services.length === 0 ? (
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

          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {this.state.List_of_services.map((items) => (
                <Grid item key={items} xs={12} sm={6} md={4}>
                  <Card className={classes.card} elevation={20}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label={items.serviceName}
                          className={classes.avatar}
                          src={items.image_url}
                        ></Avatar>
                      }
                      action={items.service_time}
                      title={items.serviceName}
                      subheader={items.service_category}
                    />
                    <CardMedia
                      style={{
                        height: 0,
                        paddingTop: "56.25%", // 16:9,
                        marginTop: "30",
                      }}
                      className={classes.cover}
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

              {!this.state.isLoading && (
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
                    className={classes.margin}
                    size="large"
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Grid>
              )}
            </Grid>

            {/* End hero unit */}
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

CardMaterial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CardMaterial);
