import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createNewPost, updatePost } from "../../redux/reducers/postReducer/posts.actions";
import { classes } from "./form.styles";

const postDataState = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(postDataState);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clearInputs = () => {
    setCurrentId(0);
    setPostData(postDataState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      ...postData,
    };

    if (currentId !== 0) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      //dispatch an action to create a post
      dispatch(createNewPost({ ...newPost, name: user?.result?.name }, navigate));
    }
    clearInputs();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setPostData({ ...postData, [name]: value.split(",") });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const base64 = await getBase64(file) // `file` your img file
      .then((res) => res) // `res` base64 of img file
      .catch((err) => console.log(err));

    setPostData({ ...postData, selectedFile: base64 });
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        style={{ ...classes.form, ...classes.root }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? "Updating" : "Creating"} a Memory</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          rows={4}
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />

        <div style={classes.fileInput}>
          <input type="file" name="memories-file" id="memories-file" onChange={handleFileUpload} />
        </div>

        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clearInputs}
          sx={classes.buttonClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
