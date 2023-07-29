import React, { useState } from "react";
import {
  Avatar,
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { PostWithAuth, RefreshTokenControl } from "../../services/HttpService";

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

function CommentForm(props) {
  const { userId, userName, postId, setCommentRefresh } = props;
  const [text, setText] = useState("");

  const classes = useStyles();

  const saveComment = () => {
    PostWithAuth("/comments", {
      postId: postId,
      userId: userId,
      text: text,
    })
      .then((res) => {
        if (!res.ok) {
          RefreshTokenControl()
            .then((result) => {
              if (result != undefined) {
                localStorage.setItem("tokenKey", result.accessToken);

                saveComment();
                setCommentRefresh();
              }
            })
            .catch((err) => console.log("error"));
        } else {
          res.json();
        }
      })
      .catch((err) => console.log("error 2"));
  };

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    saveComment();
    setText("");

    setCommentRefresh();
  };

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id="outlined-adornment-amount"
        fullWidth
        multiline
        inputProps={{ maxLength: 250 }}
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link className={classes.link} to={{ pathname: "users/" + userId }}>
              <Avatar aria-label="recipe" className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value={text}
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default CommentForm;
