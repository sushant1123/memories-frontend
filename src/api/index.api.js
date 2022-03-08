import axios from "../helpers/axios";

// const url = "/posts/";

//posts
export const fetchPosts = () => axios.get("/posts/");
export const createPost = (formData) => axios.post("/posts/", { post: formData });
export const updatePost = (id, updatedData) => axios.patch(`/posts/${id}`, updatedData);
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);

//user
export const signIn = (formData) => axios.post("/users/signin", formData);
export const signUp = (formData) => axios.post("/users/signup", formData);
