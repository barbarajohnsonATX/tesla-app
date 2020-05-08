import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  },
  appBarStyles: {
    backgroundColor: '#654F97',

  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBarStyles}>
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Barbara Johnson
        </Typography>
        <LaptopMacIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
