import {
	CREATE_POST,
	UPDATE_POST,
	FETCH_ALL_POSTS,
	FETCH_POST,
	DELETE_POST,
	LIKE_POST,
	FETCH_ALL_POSTS_BY_SEARCH,
	COMMENT_POST,
} from "../constants/posts.constants";

import { START_LOADING, END_LOADING } from "../constants/loading.constants";

const initialPostState = {
	isLoading: true,
	posts: [],
};

const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };

		case END_LOADING:
			return { ...state, isLoading: false };

		case FETCH_ALL_POSTS:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};

		case FETCH_POST:
			return { ...state, post: action.payload };

		case FETCH_ALL_POSTS_BY_SEARCH:
			return { ...state, posts: action.payload };

		case COMMENT_POST:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
			};

		case CREATE_POST:
			return { ...state, posts: [...state.posts, action.payload] };

		case UPDATE_POST:
		case LIKE_POST:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
			};

		case DELETE_POST:
			return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

		default:
			return state;
	}
};

export default postReducer;
