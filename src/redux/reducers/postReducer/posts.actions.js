import * as api from "../../../api/index.api";
import {
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
} from "./posts.slice";

//action creators
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(startLoadingFn());

    const { data } = await api.fetchPost(id);

    dispatch(fetchPostFn(data));

    dispatch(endLoadingFn());
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch(startLoadingFn());
    const { data } = await api.fetchPosts(page);

    dispatch(fetchAllPostsFn(data));

    dispatch(endLoadingFn());
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch(startLoadingFn());
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch(fetchAllPostsBySearchFn(data));

    dispatch(endLoadingFn());
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch(startLoadingFn());
    const { data } = await api.createPost(post);
    dispatch(createPostFn(data));
    navigate(`/posts/${data._id}`);

    dispatch(endLoadingFn());
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch(updatePostFn(data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE_POST, payload: id });
    dispatch(deletePostFn(id));
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: data });
    dispatch(likePostFn(data));
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT_POST, payload: data });
    dispatch(commentOnAPostFn(data));

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
