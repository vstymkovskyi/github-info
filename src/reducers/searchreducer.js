/*
 * *
 *  * Created by vstymkovskyi on 11/13/18 4:43 PM.
 *
 */

const initialState = {
  users: {
    items: []
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
}