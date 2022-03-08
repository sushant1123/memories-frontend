import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createNewPost, updatePost } from "../../redux/actions/posts.actions";
import useStyles from "./form.styles";

const postDataState = {
	title: "",
	message: "",
	tags: "",
	selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const [postData, setPostData] = useState(postDataState);
	const post = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	);
	const dispatch = useDispatch();
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
			dispatch(createNewPost({ ...newPost, name: user?.result?.name }));
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

	const handleFileUpload = (base64) => {
		// console.log(base64);
		setPostData({ ...postData, selectedFile: base64 });
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.form} ${classes.root}`}
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

				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => handleFileUpload(base64)}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
					// style={{ marginBottom: "10px" }}
				>
					Submit
				</Button>

				<Button
					variant="contained"
					color="secondary"
					size="small"
					fullWidth
					onClick={clearInputs}
					style={{ margin: "0 10px 10px" }}
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
