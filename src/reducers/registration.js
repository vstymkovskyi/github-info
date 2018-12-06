/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 3:24 PM.
 *
 */

import { userActionTypes } from '../actions/user.actions';

const initialState = { registering: false, registered: false };

export function registration(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.REGISTER_REQUEST:
      return { registering: true, registered: false };
    case userActionTypes.REGISTER_SUCCESS:
      return {registering: false, registered: true};
    case userActionTypes.REGISTER_FAILURE:
      return { registering: false, registered: false };
    default:
      return state
  }
}