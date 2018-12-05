/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:10 AM.
 *
 */

export const alertTypes = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR'
};

export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  return { type: alertTypes.SUCCESS, message };
}

function error(message) {
  return { type: alertTypes.ERROR, message };
}

function clear() {
  return { type: alertTypes.CLEAR };
}