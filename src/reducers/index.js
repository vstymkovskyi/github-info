import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import postReducer from './postreducer';
import search from './search';
import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './user';
import { notification } from './notification';

export default (history) => combineReducers({
  router: connectRouter(history),
  posts: postReducer,
  searchResults: search,
  authentication,
  registration,
  users,
  notification
})