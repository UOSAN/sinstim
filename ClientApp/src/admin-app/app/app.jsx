import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './app.scss';

const App = (props) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(evt) {
        const { type, value } = evt.target;

        setState((previousState) => {
            return {
                ...previousState,
                [type]: value
            };
        });
    }

    function handleGenerateCompletionReport() {
        const { email, password } = state;

        props.onGenerateCompletionReport({ email, password });
    }

    function handleGenerateEligibilityReport() {
        const { email, password } = state;

        props.onGenerateEligibilityReport({ email, password });
    }

    return (
        <div className="admin-app">
            <div className="panel">
                <div className="authorization-inputs">
                    <input
                        autoFocus={true}
                        className="email"
                        onChange={handleInputChange}
                        placeholder="email"
                        type="email"
                        value={state.email}
                        />
                    <input
                        className="password"
                        onChange={handleInputChange}
                        placeholder="password"
                        type="password"
                        value={state.password}
                        />
                </div>
                <div className="report-generation-buttons">
                    <button
                        className="btn btn-outline-primary completion"
                        disabled={!state.email || !state.password}
                        onClick={handleGenerateCompletionReport}
                        type="button"
                        >
                    Generate Completion Report
                    </button>
                    <button
                        className="btn btn-outline-primary eligibility"
                        disabled={!state.email || !state.password}
                        onClick={handleGenerateEligibilityReport}
                        type="button"
                        >
                    Generate Eligibility Report
                    </button>
                </div>
            </div>
        </div>
    );
};

App.propTypes = {
    onGenerateCompletionReport: PropTypes.func.isRequired,
    onGenerateEligibilityReport: PropTypes.func.isRequired
};

export default App;
