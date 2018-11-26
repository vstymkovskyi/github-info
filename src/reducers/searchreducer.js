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
    case 'FIND_USER_BY_NAME':
      console.log('**** REDUCER FIND_USER_BY_NAME ****');
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}