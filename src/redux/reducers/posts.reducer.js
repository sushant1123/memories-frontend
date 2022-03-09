import {
	CREATE_POST,
	UPDATE_POST,
	FETCH_ALL_POSTS,
	DELETE_POST,
	LIKE_POST,
	FETCH_ALL_POSTS_BY_SEARCH,
} from "../constants/posts.constants";

const initialPostState = [];

const postReducer = (state = initialPostState, action) => {
	console.log(action.payload);
	switch (action.type) {
		case FETCH_ALL_POSTS:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};

		case FETCH_ALL_POSTS_BY_SEARCH:
			return { ...state, posts: action.payload };

		case CREATE_POST:
			return [...state, action.payload];

		case UPDATE_POST:
		case LIKE_POST:
			return state.map((post) => (post._id === action.payload._id ? action.payload : post));

		case DELETE_POST:
			return state.filter((post) => post._id !== action.payload);

		default:
			return state;
	}
};

export default postReducer;
