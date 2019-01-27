import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import sinStimReducers from './state/reducers/reducers';
import App from './app/app';

const logger = createLogger();
const store = createStore(
    sinStimReducers,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(logger)
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
