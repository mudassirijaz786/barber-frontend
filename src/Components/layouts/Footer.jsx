//importing
import React from "react";
import { Typography, Toolbar, AppBar, makeStyles } from "@material-ui/core";

//styling
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
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
        style={{ marginTop: 15, position: "absolute" }}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            &copy; All right reserved
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
