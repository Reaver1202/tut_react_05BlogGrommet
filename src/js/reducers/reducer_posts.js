// import action type from action
import { FETCH_POSTS, FETCH_POST } from '../actions/index';

// define state
// List of blog posts
// active blog post
const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    case FETCH_POST:
      return { ...state, post: action.payload.data };

    case FETCH_POSTS:
      // 1. data is available in action.payload.data
      // 2. reducer needs to return a new object whenever we return our state

      // take current state and add in "all" as new object
      return { ...state, all: action.payload.data };

    default:
      return state;
  }
}
