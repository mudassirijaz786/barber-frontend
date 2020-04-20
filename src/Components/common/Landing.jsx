import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./animations/landing.json";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    textAlign: "center",
    // background: "linear-gradient(to right, #f12711, #f5af19)",
    // backgroundImage: `url(${"https://picsum.photos/seed/picsum/200/300"})`,
    backgroundRepeat: "no-repeat",
  },

  button: {
    background: "linear-gradient(to right,#311b92, #5c6bc0, #b39ddb)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    margin: 15,
    padding: "0 30px",
  },
  h5: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  more: {
    marginTop: theme.spacing(1),
  },
});

const defaultOptions = {
  animationData,
};
class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}>
        <Box color="indigo">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Upgrade your Salons
          </Typography>
        </Box>
        <Lottie width={200} height={200} speed={4} options={defaultOptions} />
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Enjoy secret offers up to -50% off the best luxury salon services
          every Sunday.
        </Typography>
        <Button
          size="large"
          component={Link}
          to="/signup"
          className={classes.button}
        >
          Register
        </Button>
        <Button
          size="large"
          component={Link}
          to="/login"
          className={classes.button}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          className={classes.more}
        >
          Discover the experience
        </Typography>

        <Typography
          variant="body2"
          color="inherit"
          align="center"
          className={classes.more}
        >
          If you are admin you can login or register as below
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={Link}
          to="/admin/signup"
          style={{ marginTop: 10 }}
          className={classes.button}
        >
          Admin Register
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={Link}
          style={{ marginTop: 10 }}
          to="/admin/login"
          className={classes.button}
        >
          Admin Login
        </Button>
      </Grid>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
