import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import sinStimReducers from './reducers/reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();
const store = createStore(
  sinStimReducers,
  applyMiddleware(logger),
  applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
