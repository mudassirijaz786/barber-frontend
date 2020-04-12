import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/styles";
import Decode from "jwt-decode";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    border: "2px solid indigo",
    margin: 10,
  },
  button: {
    minWidth: 200,
  },
});
class ServicesViewAdmin extends React.Component {
  state = {
    List_of_services: [],
    name: "mudassir",
  };

  componentDidMount() {
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
        console.log("RESPONSE OBJECT", response);
        // List_of_services = { ...this.state.List_of_services0 };
        // List_of_services = response;
        this.setState({ List_of_services: response.data });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  deleteService(id) {
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
    // console.log("decode", Decode(localStorage.getItem("x-auth-token")));
    //   console.log("IN RENDER", this.state.List_of_services);
    // this.state.List_of_services.map(item => {

    // });
    const { classes } = this.props;
    console.log("STATE", this.state.List_of_services);
    if (this.state.List_of_services.length === 0) {
      return (
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={10} sm={4} lg={4} md={4}>
            <h2>You have no serive to display </h2>
          </Grid>{" "}
        </Grid>
      );
    }

    return this.state.List_of_services.map((items) => {
      return (
        <Grid center container spacing={3} className={classes.root}>
          <Grid item center xs={10} sm={4} lg={4} md={4} spacing={10}>
            {" "}
            <Card key={items._id} item lg={6} xs={6} className={classes.card}>
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                title={items.serviceName}
                //	subheader="September 14, 2016"
              />
              <CardActionArea>
                <CardMedia
                  component="xuz"
                  alt="Contemplative Reptile"
                  height="140"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h5">
                    {items.servicePrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {items.serviceDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <DeleteIcon onClick={() => this.deleteService(items._id)} />
                <Link to={{ pathname: "/services/edit", id: items._id }}>
                  <EditIcon />
                </Link>

                <Link to={{ pathname: "/admin/services/add", id: items._id }}>
                  <ExpandMoreIcon />
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    });
  }
}

ServicesViewAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesViewAdmin);
