import React, { useState } from "react";
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
  const { title, text, userId, userName } = props;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const classes = useStyles();

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <IconButton onClick={handleLike} aria-label="add to favorites">
          <FavoriteIcon style={liked ? { color: "red" } : null} />
        </IconButton>
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
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
