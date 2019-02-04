import React from 'react';
import Consent from '../../components/common/consent';

import './app.scss';

const App = (props) => {
    return (
        <div className="eligibility-app">
            <Consent {...props} />
        </div>
    );
};

export default App;
