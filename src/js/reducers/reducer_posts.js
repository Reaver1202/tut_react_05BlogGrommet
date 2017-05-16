// TODO Reduces the eventually oversized data object to use only the wanted data
// import action type from action
// the action returns a "promise" with an action.type and action.payload
import { FETCH_POSTS, FETCH_POST, FETCH_POSTS_FAILURE, CREATE_POST, CREATE_POST_PROCESS } from '../actions/index';

// define state
// List of blog posts
// active blog post
const INITIAL_STATE = { all: [], post: null, req: null };

export default function(state = INITIAL_STATE, action) {
  console.log("reducer_posts: new action:")
  console.log(action);
  switch(action.type) {

    case FETCH_POST:
      console.log("FETCH_POST");
      return { ...state, post: action.payload };

    case FETCH_POSTS:

      console.log("FETCH_POSTS");
      // 1. data is available in action.payload.data
      // 2. reducer needs to return a new object whenever we return our state

      // take current state and add in "all" as new object
      console.log(action.payload)
      return { ...state, all:action.payload || [{"id":85590,"title":"asda","categories":"dasd","content":"asdas"}] };

    case FETCH_POSTS_FAILURE:
      console.log("An unexpected error occured during fetchPosts");
      console.log(action.error);
      // return { ...state, errorMsg: "An unexpected error occured during fetchPosts" }
      alert("An unexpected error occured during fetchPosts")
      return state;

    case CREATE_POST:
      console.log("CREATE_POST - req ")
      console.log(action.req)
      return { ...state, req: action.req };

    case CREATE_POST_PROCESS:
      console.log("..in progress")
      return state;

    default:
      return state;
  }
}
