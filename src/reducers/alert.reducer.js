/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:14 AM.
 *
 */

import { alertTypes } from '../actions/alert.actions';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertTypes.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertTypes.CLEAR:
      return {};
    default:
      return state
  }
}