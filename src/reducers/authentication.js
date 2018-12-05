/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:21 PM.
 *
 */

import { userActionTypes } from '../actions/user.actions';

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let initialState = {loggedIn: false};
if(currentUser) {
  initialState = {...initialState, currentUser, loggedIn: true}
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        currentUser: action.user
      };
    case userActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        currentUser: action.user
      };
    case userActionTypes.LOGIN_FAILURE:
      return {};
    case userActionTypes.LOGOUT:
      return {};
    default:
      return state
  }
}