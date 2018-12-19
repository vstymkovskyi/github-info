/*
 *
 *  * *
 *  *  * Created by vstymkovskyi on 12/17/18 12:29 PM.
 *  *
 *
 */

import { modalActions as notification } from './modal';

export const searchActionTypes = {
  GET_USERS: 'GET_USERS',
  GET_USER_INFO: 'GET_USER_INFO',
  CLEAR_RESULTS: 'CLEAR_RESULTS'
};

export const searchActions = {
  findUser,
  getUserInfo,
  clearResults
};

function findUser(searchParams) {
  if(searchParams.sortBy === 'best_match') {
    searchParams.sortBy = '';
  }
  let url = 'https://api.github.com/search/users?per_page=12&q='+searchParams.userName;
  if(searchParams.searchBy.length) {
    url += '+in:'+searchParams.searchBy.join(',');
  }
  url += '&sort='+searchParams.sortBy+'&order='+searchParams.orderBy;

  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if(data.message) {
          dispatch({type: searchActionTypes.CLEAR_RESULTS});

          return dispatch(notification.openModal({
            type: 'custom',
            title: 'Error',
            content: data.message
          }));
        } else {
          return dispatch({
            type:    searchActionTypes.GET_USERS,
            payload: data
          })
        }
      });
  }
}

function getUserInfo(userName) {
  return dispatch => {
    fetch('https://api.github.com/users/'+userName)
      .then(res => res.json())
      .then(data => dispatch({
        type: searchActionTypes.GET_USER_INFO,
        payload: data
      }));
  }
}

function clearResults() {
  return { type: searchActionTypes.CLEAR_RESULTS };
}