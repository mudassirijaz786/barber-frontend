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
    console.log("IN RENDER", this.state.List_of_services);
    // this.state.List_of_services.map(item => {

    // });

    return (
      <Grid item center xs={4} spacing={10} style={{ marginLeft: 450 }}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="large" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
