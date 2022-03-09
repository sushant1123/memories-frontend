import * as api from "../../api/index.api";
import {
	CREATE_POST,
	UPDATE_POST,
	FETCH_ALL_POSTS,
	FETCH_ALL_POSTS_BY_SEARCH,
	DELETE_POST,
	LIKE_POST,
} from "../constants/posts.constants";

//action creators
export const getPosts = (page) => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts(page);
		console.log(data);
		dispatch({ type: FETCH_ALL_POSTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		//destructure data from data object
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);

		dispatch({ type: FETCH_ALL_POSTS_BY_SEARCH, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createNewPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE_POST, payload: data });
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
