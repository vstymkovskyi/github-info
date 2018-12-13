/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 6:10 AM.
 *
 */

export const modalActionTypes = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

export const modalActions = {
  openModal: (obj) => ({ type: modalActionTypes.OPEN_MODAL, obj }),
  closeModal: (obj) => ({ type: modalActionTypes.CLOSE_MODAL, obj })
};