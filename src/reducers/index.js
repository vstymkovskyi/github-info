import { combineReducers } from 'redux'
import postReducer from './postreducer';
import searchReducer from './searchreducer'

export default combineReducers({
  posts: postReducer,
  searchResults: searchReducer
})