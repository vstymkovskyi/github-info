/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:10 AM.
 *
 */

export const notificationTypes = {
  SUCCESS: 'NOTIFICATION_SUCCESS',
  MESSAGE: 'MESSAGE',
  ERROR:   'NOTIFICATION_ERROR',
  CLEAR:   'NOTIFICATION_CLEAR'
};

export const notification = {
  success,
  message,
  error,
  clear
};

function success(message) {
  return { type: notificationTypes.SUCCESS, message };
}

function message(message) {
  return { type: notificationTypes.SUCCESS, message };
}

function error(message) {
  return { type: notificationTypes.ERROR, message };
}

function clear() {
  return { type: notificationTypes.CLEAR };
}