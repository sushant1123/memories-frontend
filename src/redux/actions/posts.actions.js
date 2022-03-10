import * as api from "../../api/index.api";
import {
	CREATE_POST,
	UPDATE_POST,
	FETCH_ALL_POSTS,
	FETCH_POST,
	FETCH_ALL_POSTS_BY_SEARCH,
	DELETE_POST,
	LIKE_POST,
} from "../constants/posts.constants";

import { START_LOADING, END_LOADING } from "../constants/loading.constants";

//action creators
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await api.fetchPost(id);

		dispatch({ type: FETCH_POST, payload: data });

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: FETCH_ALL_POSTS, payload: data });

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);

		dispatch({ type: FETCH_ALL_POSTS_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createNewPost = (post, navigate) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE_POST, payload: data });
		navigate(`/posts/${data._id}`);

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: UPDATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);

		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};
