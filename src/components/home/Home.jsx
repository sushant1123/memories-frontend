import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Container, Grid, Grow } from "@material-ui/core";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { getPosts } from "../../redux/actions/posts.actions";

const Home = () => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
					<Grid item xs={12} sm={8}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
