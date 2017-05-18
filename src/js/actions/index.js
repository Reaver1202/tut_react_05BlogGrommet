import { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

// define action type --> eventually in separate file
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const CREATE_POST_PROCESS = 'CREATE_POST_PROCESS';

//TODO choose one of the following endpoints
const ROOT_URL = 'http://localhost:4000/api';               // Python API --> /server-python
// const ROOT_URL = 'http://localhost:8080/api';            // ExpressJS API --> /server
// const ROOT_URL = 'http://reduxblog.herokuapp.com/api';   // online API
const API_KEY = '';//'?key=tmhpe1234321';

/*
  get all blog posts
  - detailed logging for understanding the async flow between component, action and reducer
*/
export function fetchPosts() {
  console.log("action index.js - fetchPosts() call");

  // returns a promise in an action
  return function (dispatch){
    console.log("action index.js - dispatch fetchPosts call");

    // use JavaScript fetch method to manage requests
    // in the following a extended logging is used to get knowledge how requests are asyncchroniously processed
    const options = { method: 'GET' };
    fetch(`${ROOT_URL}/posts${API_KEY}`, options)
      .then(processStatus => {
        console.log("action index.js - processStatus call");
        console.log(processStatus);
        return processStatus;
      })
      .then(response => {
        console.log("action index.js - response call");
        console.log(response);
        return response.json();
      }) // returns a promise --> result
      .then(results => {
        // instead of middleware, that handles the promise
        console.log("action index.js - results call");
        console.log(results);
        // {"id":85590,"title":"asda","categories":"dasd","content":"asdas"}
        return dispatch({ // dispatches the action to the reducer
          type: FETCH_POSTS,
          payload: results
        });
      })
      .catch(error => {
        console.log("action index.js - error call");
        console.log(error);
        return dispatch({
          type: FETCH_POSTS_FAILURE,
          error: error
        })
      });
    }
}

/* create a single blog post */
// takes properties from form and posts them to the API
// title, categories, content
export function createPost(props) {
  console.log("action index.js - createPost call");
  return function (dispatch){
    console.log("dispatch call");
    const data = JSON.stringify(props);
    console.log("action index.js - request body data:");
    console.log(data);
    const options = { method: 'POST', headers: headers, body: data };
    const request = fetch(`${ROOT_URL}/posts${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json()) // returns a promise
      // a further .then() with a dispatch to a reducer is not necessary
      // the request itself will be returned directly to the react component
      // where a further .then() is done
      .catch(error => {
        console.log("action index.js - error call");
        console.log(error);
        return dispatch({
          type: CREATE_POST_FAILURE,
          error: error
        });
      });
      return request;// return the whole promise {req: Object {...}, type: "CREATE_POST"}
      // to be able to use ".then()" in the component for further processing like "router.push('/')"
    }
}

/* get a single blog post
  - see detailed explanations in fetchPosts() method. Here the minimal code is used.
*/
export function fetchPost(id) {
  console.log("action index.js - fetchPost() call");
  return function (dispatch){
    const options = { method: 'GET' };
    fetch(`${ROOT_URL}/posts/${id}${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json())
      .then(results => dispatch( { type: FETCH_POST, payload: results } ) )
      .catch(error => dispatch( { type: FETCH_POST_FAILURE, error: error } ) );
  }
}

/* delete a single blog post */
export function deletePost(id) {
  console.log("action index.js - deletePost() call");
  return function (dispatch){
    const options = { method: 'DELETE' };
    const request = fetch(`${ROOT_URL}/posts/${id}${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json())
      // a further .then() with a dispatch to a reducer is not necessary
      // the request itself will be returned directly to the react component
      // where a further .then() is done
      .catch(error => dispatch( { type: DELETE_POST_FAILURE, error: error } ) );
    return request; // return the whole promise {payload: Object {...}, type: "DELETE_POST"}
    // to be able to use ".then()" in the component for further processing like "router.push('/')"
  }
}
