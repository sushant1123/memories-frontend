import React from "react";
import Post from "./post/Post";
import { classes } from "./posts.styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return <Typography variant="h2">No Posts</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid sx={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
