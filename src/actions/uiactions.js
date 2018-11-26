/*
 * *
 *  * Created by vstymkovskyi on 11/24/18 9:58 PM.
 *
 */

import {getUsers} from './postactions'

export const findUserByName = (userName) => dispatch => {
  //console.log('userName --> ', userName);
  return getUsers(userName);
  //console.log(users);
  //dispatch({
  //  type: 'FIND_USER_BY_NAME',
  //  payload: {items: []}
  //})
};


export const findUserByID = (userName) => dispatch => {
  //console.log('userName --> ', userName);
  return getUsers(userName);
  //console.log(users);
  //dispatch({
  //  type: 'FIND_USER_BY_NAME',
  //  payload: {items: []}
  //})
};