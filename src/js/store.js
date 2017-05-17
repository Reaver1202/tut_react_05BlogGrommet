/*
  - links all reducers together --> combineReducers
  - define a set of middlewares that are run through after action creator
    before the data is passed to the reducers
    Processing: Click --> actions ---using promises--> reducers --updates the redux application state--> component properties
*/
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// add custom reducers
import PostsReducer from './reducers/reducer_posts';

export default compose(applyMiddleware(thunk))
  (createStore)(
    combineReducers({
      // TODO add here the global redux-state variables for the reducer´s data
      posts: PostsReducer
    })
  );
