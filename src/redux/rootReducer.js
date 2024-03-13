import { combineReducers } from "redux";
import postReducer from "./reducers/posts.reducer";
import authReducer from "./reducers/auth.reducer";

export const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});
