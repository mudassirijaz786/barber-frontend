import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        // style={{ marginTop: 357.4, position: "absolute" }}
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
