import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../redux/actions/posts.actions";

import useStyles from "./post.styles";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("profile"));

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase className={classes.cardAction} onClick={openPost} component="span" name="test">
				<CardMedia image={post.selectedFile} className={classes.media} title={post.title} />
				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>

				{(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (
					<div className={classes.overlay2}>
						<Button
							style={{ color: "white" }}
							size="small"
							onClick={() => setCurrentId(post._id)}
						>
							<MoreHorizIcon fontSize="medium" />
						</Button>
					</div>
				)}

				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary">
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>

				<Typography variant="h5" gutterBottom className={classes.title}>
					{post.title}
				</Typography>

				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>

			<CardActions className={classes.cardActions}>
				<Button
					color="primary"
					size="small"
					disabled={!user?.result}
					onClick={() => dispatch(likePost(post._id))}
				>
					<Likes />
				</Button>

				{(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (
					<Button color="primary" size="small" onClick={() => dispatch(deletePost(post._id))}>
						<DeleteIcon fontSize="small" /> Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
