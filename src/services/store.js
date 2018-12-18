
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = [thunk];

export function configureStore(initialState) {
  const composeEnhancers =
          typeof window === 'object' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        ...middleware
      )
    ),
  );
}