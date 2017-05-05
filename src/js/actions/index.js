import { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

// define action type
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=tmhpe1234321';

/* get all blog posts
  - detailed logging for understanding the async flow between component, action and reducer
*/
export function fetchPosts() {
  console.log("fetchPosts() call");

  return function (dispatch){
    console.log("dispatch fetchPosts call");

    const options = { method: 'GET' };
    fetch(`${ROOT_URL}/posts${API_KEY}`, options)
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
  console.log("createPost - props:");
  console.log(props);

  // return function (dispatch){
  //   console.log("dispatch call");
    // const data = (typeof props === 'object') ?
    //   JSON.stringify(props) : props;
    const options = { method: 'POST', body: props };
    const request = fetch(`${ROOT_URL}/posts${API_KEY}`, options)
      .then(processStatus);
      // .then(response => {
      //   console.log("response call");
      //   console.log(response);
      //   return response.json();
      // }) // returns a promise --> result
      // .then(results => { return {
      //   // instead of middleware, that handles the promise
      //   // console.log("results call");
      //   // console.log(results);
      //   // {"id":85590,"title":"asda","categories":"dasd","content":"asdas"}
      //   // dispatch({ // dispatches the action to the reducer
      //     type: CREATE_POST,
      //     payload: results
      //   }})
      //   // return results
      // // })
      // .catch(error => {
      //   console.log("error call");
      //   console.log(error);
      //   return dispatch({
      //     type: FETCH_POSTS_FAILURE,
      //     error: error
      //   })
      // });
    // }

// TODO ERROR TypeError: this.props.createPost(...).then is not a function[Weitere Informationen]
// immerhin kommt nicht mehr this.props.createPost(...) is undefined.
// Aber das heißt zuvor hat eine Function wohl "undefined" oder "null" zurückgegeben.
  return {
    type: CREATE_POST,
    payload: request
  };
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
    fetch(`${ROOT_URL}/posts/${id}${API_KEY}`, options)
      .then(processStatus)
      .then(response => response.json())
      .then(results => dispatch( { type: DELETE_POST, payload: results } ) )
      .catch(error => dispatch( { type: FETCH_POSTS_FAILURE, error: error } ) );
  }
}
