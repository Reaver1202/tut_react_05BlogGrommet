import { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

// define action type
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST_PROCESS = 'CREATE_POST_PROCESS';

const ROOT_URL = 'http://localhost:8080/api';//'http://reduxblog.herokuapp.com/api';
const API_KEY = '';//'?key=tmhpe1234321';

/* get all blog posts
  - detailed logging for understanding the async flow between component, action and reducer
*/
export function fetchPosts() {
  console.log("fetchPosts() call");

  return function (dispatch){
    console.log("dispatch fetchPosts call");

    const options = { method: 'GET' };
    fetch(`${ROOT_URL}/posts`, options)
      .then(processStatus => {
        console.log("processStatus call");
        console.log(processStatus);
        //TODO what happens when error occurs
        // Response { type: "cors", url: "http://reduxblog.herokuapp.com/ap/p…", redirected: false, status: 404, ok: false, statusText: "Not Found", headers: Headers, bodyUsed: false }
        return processStatus;
      })
      .then(response => {
        console.log("response call");
        console.log(response);
        return response.json();
      }) // returns a promise --> result
      .then(results => {
        // instead of middleware, that handles the promise
        console.log("results call");
        console.log(results);
        // {"id":85590,"title":"asda","categories":"dasd","content":"asdas"}
        return dispatch({ // dispatches the action to the reducer
          type: FETCH_POSTS,
          payload: results
        });
      })
      .catch(error => {
        console.log("error call");
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
  console.log("createPost call");
  return function (dispatch){
    console.log("dispatch call");
    const data = JSON.stringify(props);
    console.log("request body data:");
    console.log(data);
    const options = { method: 'POST', headers: headers, body: data };
    const request = fetch(`${ROOT_URL}/posts${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json()) // returns a promise --> result
      .then(results => { // TODO sollte nicht mal nötig sein
        // instead of middleware, that handles the promise
        console.log("results call");
        console.log(results);
        // {"id":85590,"title":"asda","categories":"dasd","content":"asdas"}
        return dispatch({ // dispatches the action to the reducer
          type: CREATE_POST,
          req: results
        });
      })
      .catch(error => {
        console.log("error call");
        console.log(error);
        return dispatch({
          type: FETCH_POSTS_FAILURE,
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
  console.log("fetchPost() call");
  return function (dispatch){
    const options = { method: 'GET' };
    fetch(`${ROOT_URL}/posts/${id}${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json())
      .then(results => dispatch( { type: FETCH_POST, payload: results } ) )
      .catch(error => dispatch( { type: FETCH_POSTS_FAILURE, error: error } ) );
  }
}

/* delete a single blog post */
export function deletePost(id) {
  console.log("deletePost() call");
  return function (dispatch){
    const options = { method: 'DELETE' };
    const request = fetch(`${ROOT_URL}/posts/${id}${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json())
      .then(results => dispatch( { type: DELETE_POST, payload: results } ) )  // TODO nicht nötig
      .catch(error => dispatch( { type: FETCH_POSTS_FAILURE, error: error } ) );
    return request; // return the whole promise {payload: Object {...}, type: "DELETE_POST"}
    // to be able to use ".then()" in the component for further processing like "router.push('/')"
  }
}
