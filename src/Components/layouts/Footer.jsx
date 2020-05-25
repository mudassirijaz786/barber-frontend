//importing
import React from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import { BottomNavigation } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

//styling
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  link: {
    color: "indigo",
  },
}));

//function Footer
const Footer = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <BottomNavigation style={{ marginTop: 10 }}>
        <Grid container>
          <Grid item sm={12} lg={4} xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" className={classes.title}>
              Send any query at
            </Typography>
            <br />
            <Typography variant="h6" className={classes.link}>
              fa16-bcs-331@cuilahore.edu.pk
            </Typography>
          </Grid>
          <Grid item sm={12} lg={4} xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" className={classes.title}>
              Fazal ur rehman
            </Typography>
            <br />
            <Typography variant="h6" className={classes.link}>
              +923014174017
            </Typography>
          </Grid>
          <Grid item sm={12} lg={4} xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" className={classes.title}>
              Mudassir Ijaz
            </Typography>
            <br />
            <Typography variant="h6" className={classes.link}>
              +923314068055
            </Typography>
          </Grid>
        </Grid>
      </BottomNavigation>
    </React.Fragment>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting Footer
export default withStyles(useStyles)(Footer);
