import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { PostWithAuth, RefreshTokenControl } from "../../services/HttpService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const classes = useStyles();

  const savePost = () => {
    PostWithAuth("/posts", {
      userId: userId,
      title: title,
      text: text,
    })
      .then((res) => {
        if (!res.ok) {
          RefreshTokenControl()
            .then((result) => {
              if (result != undefined) {
                localStorage.setItem("tokenKey", result.accessToken);

                savePost();
                refreshPosts();
              }
            })
            .catch((err) => console.log("error"));
        } else {
          res.json();
          refreshPosts();
        }
      })
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={7000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your post is sent!
        </Alert>
      </Snackbar>
      <Card sx={{ width: 800, margin: 12, textAlign: "left" }}>
        <CardHeader
          avatar={
            <Link className={classes.link} to={{ pathname: "users/" + userId }}>
              <Avatar
                sx={{
                  background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outline-adornment-amount"
              fullWidth
              value={title}
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <OutlinedInput
              id="outline-adornment-amount"
              fullWidth
              multiline
              value={text}
              placeholder="Text"
              inputProps={{ maxLength: 250 }}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                      color: "white",
                    }}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
