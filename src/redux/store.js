import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer/posts.slice";
import authReducer from "./reducers/authReducer/auth.slice";

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});
