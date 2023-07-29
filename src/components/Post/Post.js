import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function Post(props) {
  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likeCount, setLikedCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const isInitialMount = useRef(true);

  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const classes = useStyles();

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikedCount(likeCount + 1);
    } else {
      deleteLike();
      setLikedCount(likeCount - 1);
    }
  };

  const checkLikes = () => {
    var likeControl = likes.find(
      (like) => "" + like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const setCommentRefresh = () => {
    setRefresh(true);
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    setRefresh(false);
  };

  const saveLike = () => {
    PostWithAuth("/likes", {
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const deleteLike = () => {
    DeleteWithAuth("likes/" + likeId)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);

  useEffect(() => {
    checkLikes();
  });

  return (
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
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {disabled ? (
          <IconButton
            disabled
            onClick={handleLike}
            aria-label="add to favorites"
          >
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
        ) : (
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
        )}

        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment) => (
                <Comment
                  userId={comment.userId}
                  userName={comment.userName}
                  text={comment.text}
                ></Comment>
              ))
            : "Loading"}
          {localStorage.getItem("currentUser") == null ? (
            ""
          ) : (
            <CommentForm
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              postId={postId}
              setCommentRefresh={setCommentRefresh}
            ></CommentForm>
          )}
        </Container>
      </Collapse>
    </Card>
  );
}

export default Post;
