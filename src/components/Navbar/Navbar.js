import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { LockOpen } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function Navbar() {
  const classes = useStyles();
  let navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentUser");
    navigate(0);
  };

  return (
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
          <Typography
            variant="h6"
            component="div"
            textAlign={"left"}
            sx={{ flexGrow: 1 }}
          >
            <Link className={classes.link} to="/">
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            {localStorage.getItem("currentUser") == null ? (
              <Link className={classes.link} to="/auth">
                Login/Register
              </Link>
            ) : (
              <div>
                <Link
                  className={classes.link}
                  to={{
                    pathname: "users/" + localStorage.getItem("currentUser"),
                  }}
                >
                  Profile
                </Link>
                <IconButton className={classes.link} onClick={onClick}>
                  <LockOpen></LockOpen>
                </IconButton>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
