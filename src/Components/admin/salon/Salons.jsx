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
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/styles";
import Decode from "jwt-decode";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const styles = (theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    flexGrow: 1,

    // justifyContent: "center",
  },
  card: {
    height: 450,
    width: 400,
    margin: 20,
    border: "2px solid indigo",
  },
  button: {
    minWidth: 200,
  },
  paper: { marginTop: 40, border: "2px solid indigo" },
  display: { display: "inline", marginLeft: 20, nested: { marginLeft: 15 } },
});
class CardMaterial extends React.Component {
  state = {
    List_of_salons: [123],
    name: "mudassir",
  };

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.setState({ loading: true });
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
        this.setState({ List_of_salons: response.data });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
    this.setState({ loading: false });
  };

  acceptSalon = (id) => {
    const salon = this.state.List_of_salons;
    const filter_result = salon.filter((e) => e.id !== id);
    this.setState({ List_of_salons: filter_result });
    Axios({
      url:
        "https://digital-salons -app.herokuapp.com/Digital_Saloon.com/api/superadmin/" +
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
    const salon = this.state.List_of_salons;
    const filter_result = salon.filter((e) => e.id !== id);
    this.setState({ List_of_salons: filter_result });

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
        <h2 style={{ textAlign: "center" }}>Requested salons</h2>
        <Grid container spacing={3} maxWidth="lg">
          {this.state.List_of_salons.length === 0 && (
            <Grid item xs={6}>
              <h2 style={{ textAlign: "center" }}>No salon to display</h2>
            </Grid>
          )}

          {this.state.List_of_salons.length !== 0 &&
            this.state.List_of_salons.map((items) => {
              return (
                <div>
                  {this.state.isLoading ? (
                    <ProgressSpinner />
                  ) : (
                    <Grid item xs={6}>
                      <Card
                        items
                        style={{
                          height: 320,
                          width: 400,
                          margin: 20,
                          border: "2px solid indigo",
                        }}
                      >
                        <CardHeader title={items.SalonName} />
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <span style={{ color: "indigo" }}>
                                Phone number:{" "}
                              </span>{" "}
                              {items.SalonOwnerphoneNumber}
                            </Typography>{" "}
                            <Typography>
                              <span style={{ color: "indigo" }}>
                                Phone number:{" "}
                              </span>{" "}
                              {items.SalonOwnerphoneNumber}
                            </Typography>{" "}
                            <Typography>
                              <span style={{ color: "indigo" }}>
                                Owner name:{" "}
                              </span>{" "}
                              {items.Salon_owner_firstName}{" "}
                            </Typography>{" "}
                          </CardContent>
                        </CardActionArea>

                        <CardActions disableSpacing>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.display}
                            onClick={() => this.acceptSalon(items._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.display}
                            onClick={() => this.rejectSalon(items._id)}
                          >
                            Reject
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </div>
              );
            })}
        </Grid>
      </React.Fragment>
    );
  }
}

CardMaterial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardMaterial);
