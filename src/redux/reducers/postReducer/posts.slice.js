import { createSlice } from "@reduxjs/toolkit";

const initialPostState = {
  isLoading: true,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    startLoadingFn(state, action) {
      return { ...state, isLoading: true };
    },
    endLoadingFn(state, action) {
      return { ...state, isLoading: false };
    },
    fetchAllPostsFn(state, action) {
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    },
    fetchPostFn(state, action) {
      return { ...state, post: action.payload };
    },

    fetchAllPostsBySearchFn(state, action) {
      return { ...state, posts: action.payload };
    },

    commentOnAPostFn(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    },
    createPostFn(state, action) {
      return { ...state, posts: [...state.posts, action.payload] };
    },
    updatePostFn(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    },
    likePostFn(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    },
    deletePostFn(state, action) {
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {
  startLoadingFn,
  endLoadingFn,
  fetchAllPostsFn,
  fetchPostFn,
  fetchAllPostsBySearchFn,
  commentOnAPostFn,
  createPostFn,
  updatePostFn,
  likePostFn,
  deletePostFn,
} = postSlice.actions;

// Export the slice reducer as the default export
export default postSlice.reducer;
