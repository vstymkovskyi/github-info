/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:24 PM.
 *
 */

import { userActionTypes } from '../actions/user.actions';

const initialState = { registering: false };

export function registration(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.REGISTER_REQUEST:
      return { registering: true };
    case userActionTypes.REGISTER_SUCCESS:
      return {};
    case userActionTypes.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}