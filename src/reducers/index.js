import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import postReducer from './postreducer';
import searchReducer from './searchreducer';
import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './user';
import { notification } from './notification';

export default (history) => combineReducers({
  router: connectRouter(history),
  posts: postReducer,
  searchResults: searchReducer,
  authentication,
  registration,
  users,
  notification
})