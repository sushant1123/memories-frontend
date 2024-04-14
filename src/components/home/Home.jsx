import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useLocation, useNavigate } from "react-router-dom";

import Pagination from "../pagination/Pagination";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { getPostsBySearch } from "../../redux/reducers/postReducer/posts.actions";
import { classes } from "./home.styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const searchPosts = () => {
    if (search.trim() || tags.length) {
      //dispatch fetch posts
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));

      //route user to below url
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
    } else {
      navigate("/");
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //keyCode 13 => enter key code. when user pressed key
      //search post logic here
      searchPosts();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar sx={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                label="Search Tags"
                variant="outlined"
              />

              <Button
                onClick={searchPosts}
                sx={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} sx={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
