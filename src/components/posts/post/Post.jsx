import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deletePost, likePost } from "../../../redux/reducers/postReducer/posts.actions";

import { classes } from "./post.styles";

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?.googleId || user?.result?._id;
  const hasUserLikedPost = post.likes.find((like) => like === userId);

  const handleLikeClick = async () => {
    dispatch(likePost(post._id));

    if (hasUserLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card sx={classes.card} raised elevation={6}>
      <ButtonBase sx={classes.cardAction} onClick={openPost} component="span" name="test">
        <CardMedia image={post.selectedFile} sx={classes.media} title={post.title} />
        <div style={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div style={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                setCurrentId(post._id);
                e.stopPropagation();
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}

        <div style={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography variant="h5" gutterBottom sx={classes.title}>
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}
            {post.message.split(" ").length > 20 && "..."}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions sx={classes.cardActions}>
        <Button color="primary" size="small" disabled={!user?.result} onClick={handleLikeClick}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button color="secondary" size="small" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
