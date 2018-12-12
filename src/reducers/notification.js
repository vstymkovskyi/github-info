/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:14 AM.
 *
 */

import { notificationTypes } from '../actions/notification';

export function notification(state = {}, action) {
  switch (action.type) {
    case notificationTypes.SUCCESS:
      return {
        type: 'notification-success',
        message: action.message
      };
    case notificationTypes.ERROR:
      return {
        type: 'notification-danger',
        message: action.message
      };
    case notificationTypes.CLEAR:
      return {};
    default:
      return state
  }
}