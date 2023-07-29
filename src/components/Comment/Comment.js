import React from "react";
import {
  Avatar,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: useTheme().spacing(4),
    height: useTheme().spacing(4),
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function Comment(props) {
  const { userId, userName, text } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id="outlined-adornment-amount"
        fullWidth
        multiline
        disabled
        inputProps={{ maxLength: 25 }}
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link className={classes.link} to={{ pathname: "users/" + userId }}>
              <Avatar aria-label="recipe" className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default Comment;
