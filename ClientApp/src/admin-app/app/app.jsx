import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './app.scss';

const App = (props) => {
    const [credentials, setCredentials] = useState({});

    function handleInputChange(evt) {
        setCredentials({
            [evt.target.type]: evt.target.value
        });
    }

    function handleGenerateCompletionReport() {
        const { email, password } = credentials;

        props.onGenerateCompletionReport({ email, password });
    }

    function handleGenerateEligibilityReport() {
        const { email, password } = credentials;

        props.onGenerateEligibilityReport({ email, password });
    }

    return (
        <div className="admin-app">
            <div className="authorization-inputs">
                <input
                    className="email"
                    onChange={handleInputChange}
                    type="email"
                    value={credentials.email}
                    />
                <input
                    className="password"
                    onChange={handleInputChange}
                    type="password"
                    value={credentials.password}
                    />
            </div>
            <div className="report-generation-buttons">
                <button
                    className="btn btn-outline-primary"
                    onClick={handleGenerateCompletionReport}
                    type="button"
                    >
                    Generate Completion Report
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={handleGenerateEligibilityReport}
                    type="button"
                    >
                    Generate Eligibility Report
                </button>
            </div>
        </div>
    );
};

App.propTypes = {
    onGenerateCompletionReport: PropTypes.func.isRequired,
    onGenerateEligibilityReport: PropTypes.func.isRequired
};

export default App;
