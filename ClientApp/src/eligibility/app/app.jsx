import React from 'react';
import Consent from '../../components/consent';

import './app.scss';

const App = (props) => {
    return (
        <div className="eligibility-app">
            <Consent {...props} />
        </div>
    );
};

export default App;
