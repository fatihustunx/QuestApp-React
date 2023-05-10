import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f5ff",
  },
}));

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const classes = useStyles();

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
        <Container flex>
          <PostForm
            userId={1}
            userName={"asdasd"}
            refreshPosts={refreshPosts}
          ></PostForm>
          {postList.map((post) => (
            <Post
              userId={post.userId}
              userName={post.userName}
              title={post.title}
              text={post.text}
            ></Post>
          ))}
        </Container>
      </div>
    );
  }
}

export default Home;
