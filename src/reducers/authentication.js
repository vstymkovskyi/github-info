/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:21 PM.
 *
 */

import { userActionTypes } from '../actions/user.actions';

let user = JSON.parse(localStorage.getItem('user'));
let initialState = {loggedIn: false};
if(user) {
  initialState = {...initialState, user}
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userActionTypes.LOGIN_FAILURE:
      return {};
    case userActionTypes.LOGOUT:
    default:
      return state
  }
}