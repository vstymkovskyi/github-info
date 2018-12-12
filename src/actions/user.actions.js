/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:09 PM.
 *
 */

import { userService } from '../services/user.service';
import { notification } from './notification';

export const userActionTypes = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  GETALL_REQUEST: 'USERS_GETALL_REQUEST',
  GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
  GETALL_FAILURE: 'USERS_GETALL_FAILURE',

  GET_PROFILE_AVATAR: 'GET_PROFILE_AVATAR',

  DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  DELETE_FAILURE: 'USERS_DELETE_FAILURE'
};

export const userActions = {
  login,
  loginWithFirebase,
  logout,
  register,
  getAllUsers,
  deleteUser,
  getProfileAvatar
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
        .then(
            user => {
              dispatch(success(user));
            },
            error => {
              dispatch(failure(error.toString()));
              dispatch(notification.error(error.toString()));
            }
        );
  };

  function request(user) { return { type: userActionTypes.LOGIN_REQUEST, user } }
  function success(user) { return { type: userActionTypes.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userActionTypes.LOGIN_FAILURE, error } }
}

function loginWithFirebase(username, user, type) {
  return dispatch => {
    dispatch(request({ username }));

    userService.loginWithFirebase(user, type)
      .then(
          user => {
            dispatch(success(user, type));
          },
          error => {
            dispatch(failure(error.toString()));
            dispatch(notification.error(error.toString()));
          }
      );
  };

  function request(user, loginType) { return { type: userActionTypes.LOGIN_REQUEST, user, loginType } }
  function success(user, loginType) { return { type: userActionTypes.LOGIN_SUCCESS, user, loginType } }
  function failure(error) { return { type: userActionTypes.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();

  return { type: userActionTypes.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
        .then(
            user => {
              dispatch(success());
              dispatch(success(user, 'Registration successful'));
            },
            error => {
              dispatch(failure(error.toString()));
              dispatch(notification.error(error.toString()));
            }
        );
  };

  function request(user) { return { type: userActionTypes.REGISTER_REQUEST, user } }
  function success(user) { return { type: userActionTypes.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userActionTypes.REGISTER_FAILURE, error } }
}

function getAllUsers() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
        .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error.toString()))
        );
  };

  function request() { return { type: userActionTypes.GETALL_REQUEST } }
  function success(users) { return { type: userActionTypes.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userActionTypes.GETALL_FAILURE, error } }
}

function deleteUser(id) {
  return dispatch => {
    dispatch(request(id));

    userService.deleteUser(id)
        .then(
            user => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        );
  };

  function request(id) { return { type: userActionTypes.DELETE_REQUEST, id } }
  function success(id) { return { type: userActionTypes.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userActionTypes.DELETE_FAILURE, id, error } }
}

function getProfileAvatar(email) {
  return dispatch => {
    userService.getAvatar().then(
      avatar => {
        console.log('getProfileAvatar');
        console.log(avatar);
        dispatch({type: userActionTypes.GET_PROFILE_AVATAR, avatar});
      }
    )

  }
}