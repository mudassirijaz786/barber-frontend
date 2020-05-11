//importing
import React from "react";
import {
  Typography,
  Toolbar,
  AppBar,
  makeStyles,
  Grid,
} from "@material-ui/core";

//styling
const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "indigo",
  },
}));

//function Footer
export default function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment className={classes.root}>
      <AppBar
        position="relative"
        style={{ marginTop: 10, position: "relative" }}
        color="inherit"
      >
        <Toolbar>
          <Grid item xs={12} lg={12} md={12} sm={12} spacing={12}>
            <Typography variant="h6" className={classes.title}>
              Have any question?
            </Typography>
            <Typography variant="h6" className={classes.link}>
              fa16-bcs-331@cuilahore.edu.pk
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4} md={4} sm={4} spacing={10}>
            <Typography variant="h6" className={classes.title}>
              Fazal ur rehman
            </Typography>
            <Typography variant="h6" className={classes.link}>
              +923014174017
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4} md={4} sm={4} spacing={2}>
            <Typography variant="h6" className={classes.title}>
              Mudassir Ijaz
            </Typography>
            <Typography variant="h6" className={classes.link}>
              +923314068055
            </Typography>
          </Grid>
          <Grid item xs={4} lg={4} md={4} sm={4} spacing={2}>
            <Typography variant="h6" className={classes.title}>
              Moazzam
            </Typography>
            <Typography variant="h6" className={classes.link}>
              +923144355315
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
