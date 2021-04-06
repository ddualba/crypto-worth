import React from 'react';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'reducers/index';

// Thunk Middleware
import thunk from 'redux-thunk';
const middleware = [thunk];

const Root = ({ children, initialState = {} }) => {
  return (
    <Provider
      store={createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      )}
    >
      {children}
    </Provider>
  );
};

export default Root;
