import { combineReducers } from "redux";
import postReducer from "./reducers/posts.reducer";

export const rootReducer = combineReducers({
	posts: postReducer,
});
