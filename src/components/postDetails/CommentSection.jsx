import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../redux/reducers/postReducer/posts.actions";

import { classes } from "./postDetails.styles";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleCommentClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const updatedPosts = await dispatch(commentPost(finalComment, post._id));

    setComments(updatedPosts);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div sx={classes.commentsOuterContainer}>
        <div style={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong> <b>:</b>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>

        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!comment}
              onClick={handleCommentClick}
            >
              COMMENT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
