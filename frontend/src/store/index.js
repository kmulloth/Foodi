import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { restoreCSRF, csrfFetch } from './csrf';
import sessionReducer from './session';
import businessReducer from './businesses';
import reviewReducer from './reviews';
import * as sessionActions from './session';
import * as businessActions from './businesses';
import * as reviewActions from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  businesses: businessReducer,
  reviews: reviewReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
    window.businessActions = businessActions;
    window.reviewActions = reviewActions;
  }

export default configureStore;
