import { combineReducers } from "redux";
import PostsReducer from "./posts";
import { reducer as FormReducer } from "redux-form";
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: FormReducer
  //formReducer'ı form'a atamak önemli.
});

export default rootReducer;
