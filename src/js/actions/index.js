import axios from 'axios';
import { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

// define action type
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=tmhpe1234321';

/* get all blog posts */
export function fetchPosts() {
  console.log("fetchPosts() call")
  // const request1 = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  // return new Promise((resolve, reject) => {
  //   const options = { method: 'GET' };
  //
  //   fetch(`${ROOT_URL}/posts${API_KEY}`, options)
  //   .then(processStatus)
  //   .then(response => {
  //     console.log("fetchPosts: response=<"+response+">");
  //     if (response.error) {
  //       console.log("store.js fetchPosts: unexpected error");
  //       reject('An unexpected error');
  //     } else {
  //       console.log("resolve response")
  //       resolve();
  //     }
  //   });
  // });

  return function (dispatch){


  const options = { method: 'GET' };
  const request2 = fetch(`${ROOT_URL}/posts${API_KEY}`, options)
    .then(processStatus)
    // .then(response => response.json());

    .then(response => response.json())
    .then(result => dispatch(getPosts(result)));

    // .then(response => {
    //
    //     console.log({response});
    //     let ret = {
    //       type: FETCH_POSTS,
    //       payload: response.json()
    //     };
    //     console.log(ret)
    //     return ret;
    // });

    // .then(response => response.json())
    // .then(result =>
    //   {
    //     console.log({result});
    //     let ret = {
    //       type: FETCH_POSTS,
    //       payload: {result}
    //     };
    //     console.log(ret)
    //     return ret;
    //   }
    // ).catch(error => {
    //   console.log(error);
    // });
  //
  //
  // console.log({"id":85590,"title":"asda","categories":"dasd","content":"asdas"});
  // return {"id":85590,"title":"asda","categories":"dasd","content":"asdas"};


  // console.log(request1);
  console.log(request2);
  // return {
  //   type: FETCH_POSTS,
  //   // redux-promise will unwrapp the promise and the data will flow throughall of our reducers
  //   payload: request2
  // };
    }
}

export function getPosts (results) {
  return {
    type: FETCH_POSTS,
    // redux-promise will unwrapp the promise and the data will flow throughall of our reducers
    payload: results
  };
}

/* create a single blog post */
// takes properties from form and posts them to the API
// title, categories, content
export function createPost(props) {
  console.log("createPost - props:");
  console.log(props);
  // post method
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

/* get a single blog post */
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

/* delete a single blog post */
export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}
