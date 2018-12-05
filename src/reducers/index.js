import { combineReducers } from 'redux'
import postReducer from './postreducer';
import searchReducer from './searchreducer';
import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './user';
import { alert } from './alert.reducer';

export default combineReducers({
  posts: postReducer,
  searchResults: searchReducer,
  authentication,
  registration,
  users,
  alert
})