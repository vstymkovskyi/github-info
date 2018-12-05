/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:25 PM.
 *
 */

import { userActionTypes } from '../actions/user.actions';

export function users(state = {}, action) {
  switch (action.type) {
    case userActionTypes.GETALL_REQUEST:
      return {
        loading: true
      };
    case userActionTypes.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userActionTypes.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userActionTypes.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
            user.id === action.id
                ? { ...user, deleting: true }
                : user
        )
      };
    case userActionTypes.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userActionTypes.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}