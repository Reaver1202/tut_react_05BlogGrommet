/*
  - link all reducers together --> combineReducers
  - define a set of middlewares that are run through after action creator
    before the data is passed to the reducers
*/
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import PostsReducer from './reducers/reducer_posts';
import thunk from 'redux-thunk';


// import promise from 'redux-promise';

export default compose(applyMiddleware(thunk))
  (createStore)(
    combineReducers({
      posts: PostsReducer
    })
  );
