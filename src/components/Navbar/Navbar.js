import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    link : {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
}));

function Navbar(){
    let userId=2;
    const classes = useStyles();

    return(
        <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" textAlign={"left"} sx={{ flexGrow: 1 }}>
          <Link className={classes.link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div">
          <Link className={classes.link} to={{pathname : 'users/' + userId}}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default Navbar;