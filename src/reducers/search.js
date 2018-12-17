/*
 * *
 *  * Created by vstymkovskyi on 11/13/18 4:43 PM.
 *
 */

import {searchActionTypes} from '../actions/search';

const initialState = {
  users: {
    items: []
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case searchActionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case searchActionTypes.GET_USER_INFO:
      return {
        ...state,
        userData: action.payload
      };
    case searchActionTypes.CLEAR_RESULTS:
      return initialState;
    default:
      return state;
  }
}