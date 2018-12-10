
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

const middleware = [thunk];

export function configureStore(initialState, history) {
    return createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          ...middleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
}