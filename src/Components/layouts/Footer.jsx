//importing
import React from "react";
import { Typography, Toolbar, AppBar, makeStyles } from "@material-ui/core";

//styling
const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

//function Footer
export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        style={{ marginTop: 10, position: "absolute" }}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Mudassir Ijaz
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Fazal Ur Rehman
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Moazzam
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
