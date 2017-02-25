import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import storage from '../utils/storage';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();
// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  }) :
  compose;
/* eslint-enable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(thunk, promise, logger),
  storage(),
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
