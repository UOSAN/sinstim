import React from 'react';
import PropTypes from 'prop-types';

import Consent from '../../components/common/consent';
import Instructions from '../../components/eligibility-instructions'

import './app.scss';

const App = (props) => {
    return (
        <div className="eligibility-app">
            {!props.isConsented && <Consent {...props} />}
            {props.isConsented && <Instructions />}
        </div>
    );
};

App.propTypes = {
    isConsented: PropTypes.bool
};

export default App;
