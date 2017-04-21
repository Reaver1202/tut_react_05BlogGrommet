import { combineReducers } from 'redux';
// import new reducer
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  // specifically "form"
  form: formReducer
});

export default rootReducer;
