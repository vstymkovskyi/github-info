/*
 * *
 *  * Created by vstymkovskyi on 11/24/18 9:58 PM.
 *
 */

export const findUserByName = (userName) => dispatch => {
  console.log('userName --> ', userName);
  dispatch({
    type: 'FIND_USER_BY_NAME',
    payload: {items: []}
  })
};
