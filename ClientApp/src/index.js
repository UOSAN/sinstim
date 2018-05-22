import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import sinStimReducers from './reducers/reducers';
import AppContainer from './app/app-container';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();
const store = createStore(
  sinStimReducers,
  applyMiddleware(logger),
  applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
