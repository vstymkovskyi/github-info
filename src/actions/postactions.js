import {FETCH_POSTS, NEW_POSTS, GET_USERS} from "./types";

export function fetchPosts() {
  return function (dispatch) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => dispatch({
          type: FETCH_POSTS,
          payload: posts
        }));
  }
}

export const createPost = (postData) => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
      .then(res => res.json())
      .then(data => dispatch({
        type: NEW_POSTS,
        payload: data
      }));
};

export const getUsers = (userName) => dispatch => {
  fetch('https://api.github.com/search/users?per_page=12&q='+userName)
      .then(res => res.json())
      .then(data => dispatch({
        type: GET_USERS,
        payload: data
      }));
};