/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:14 AM.
 *
 */

import { modalActionTypes } from '../actions/modal';


const initialState = {
  modals: []
};


export function notification(state = initialState, action) {
  switch (action.type) {
    case modalActionTypes.OPEN_MODAL:
      return {
        ...state,
        modals: state.modals.concat(action.obj)
      };
    case modalActionTypes.CLOSE_MODAL:
      return {
        ...state,
        modals: state.modals.filter(item => item.id !== action.obj.id),
      };
    default:
      return state
  }
}