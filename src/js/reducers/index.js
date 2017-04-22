import { combineReducers } from 'redux';
// import new reducer
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
