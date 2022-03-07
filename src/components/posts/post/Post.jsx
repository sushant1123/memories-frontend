import React from "react";
import useStyles from "./post.styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts.actions";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	return (
		<Card className={classes.card}>
			<CardMedia image={post.selectedFile} className={classes.media} title={post.title} />
			<div className={classes.overlay}>
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
					<MoreHorizIcon fontSize="medium" />
				</Button>
			</div>
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

			<CardActions className={classes.cardActions}>
				<Button color="primary" size="small" onClick={() => dispatch(likePost(post._id))}>
					<ThumbUpAlt fontSize="small" /> Like &nbsp; {post.likeCount}
				</Button>

				<Button color="primary" size="small" onClick={() => dispatch(deletePost(post._id))}>
					<DeleteIcon fontSize="small" /> Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
