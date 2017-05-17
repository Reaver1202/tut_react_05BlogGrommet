// TODO Reduces the eventually oversized data object to use only the wanted data
// import action type from action
// the action returns a "promise" with an action.type and action.payload
import {
  FETCH_POSTS, FETCH_POSTS_FAILURE,
  FETCH_POST, FETCH_POST_FAILURE,
  CREATE_POST, CREATE_POST_FAILURE,
  DELETE_POST_FAILURE
} from '../actions/index';

// define state
// - all: List of blog posts
// - post: active blog post
const INITIAL_STATE = { all: [], post: null, req: null };

export default function(state = INITIAL_STATE, action) {
  console.log("reducer_posts.js - new action:")
  console.log(action);

  // for each action type defined in the action creators /actions/*,
  // manage or reduce the data and update the redux application state
  switch(action.type) {

    case FETCH_POST:
      console.log("reducer_posts.js - FETCH_POST");
      // update the single post
      return { ...state, post: action.payload };

    case FETCH_POSTS:

      console.log("reducer_posts.js - FETCH_POSTS");
      // data is available in action.payload
      // take current state and add in "all" as new object
      console.log(action.payload)
      return { ...state, all:action.payload || [{"id":85590,"title":"asda","categories":"dasd","content":"asdas"}] };

    case CREATE_POST:
      console.log("reducer_posts.js - CREATE_POST - req ")
      console.log(action.req)
      return { ...state, req: action.req };

    /* Manage all failures */
    case FETCH_POSTS_FAILURE:
      console.log("reducer_posts.js - An unexpected error occured during fetchPosts");
      console.log(action.error);
      alert("An unexpected error occured during fetchPosts")
      return state;

    case FETCH_POST_FAILURE:
      console.log("reducer_posts.js - An unexpected error occured during fetchPost");
      console.log(action.error);
      alert("An unexpected error occured during fetchPost")
      return state;

    case CREATE_POST_FAILURE:
      console.log("reducer_posts.js - An unexpected error occured during createPost");
      console.log(action.error);
      alert("An unexpected error occured during createPost")
      return state;

    case DELETE_POST_FAILURE:
      console.log("reducer_posts.js - An unexpected error occured during deletePost");
      console.log(action.error);
      alert("An unexpected error occured during deletePost")
      return state;

    default:
      return state;
  }
}
