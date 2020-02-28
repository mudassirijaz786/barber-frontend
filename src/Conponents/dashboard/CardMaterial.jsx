import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";

export default class CardMaterial extends React.Component {
  state = {
    List_of_services: [123],
    name: "mudassir"
  };

  componentDidMount() {
    Axios({
      url:
        "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/salonservices",
      method: "GET"
    })
      .then(response => {
        console.log("RESPONSE OBJECT", response.data);
        // List_of_services = { ...this.state.List_of_services0 };
        // List_of_services = response;
        this.setState({ List_of_services: response.data });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch(function(error) {
        alert(error);
      });
  }
  render() {
    //   console.log("IN RENDER", this.state.List_of_services);
    // this.state.List_of_services.map(item => {

    // });
    console.log(this.state.List_of_services);
    if (this.state.List_of_services.length === 0) {
      return <h2>You have no serive to display </h2>;
    }
    return this.state.List_of_services.map(items => {
      return (
        <div style={{ flexGrow: 1 }}>
          {/* <Grid container spacing={3} style={{ marginTop: 5 }}>
            <Grid item lg={6} xs={6}> */}
          <Card key={items._id} item lg={6} xs={6}>
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
                  Price: {items.servicePrice}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {items.serviceDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="large"
                color="primary"
                variant="contained"
                ariant="body2"
                style={{ cursor: "pointer" }}
              >
                Book now
              </Button>
            </CardActions>
          </Card>
          {/* </Grid>
          </Grid> */}
        </div>
      );
    });
  }
}
