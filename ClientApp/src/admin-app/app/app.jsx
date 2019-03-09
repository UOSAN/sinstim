import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { CSVDownload } from 'react-csv';

import './app.scss';

const App = (props) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [reportData, setReportData] = useState({});

    function handleInputChange(evt) {
        const { type, value } = evt.target;

        setCredentials((previousState) => {
            return {
                ...previousState,
                [type]: value
            };
        });
    }

    async function handleGenerateCompletionReport() {
        setReportData({});
        const { email, password } = credentials;
        const { data, headers } = await props.onGenerateCompletionReport({ email, password });

        setReportData({
            data,
            headers,
        });
    }

    async function handleGenerateEligibilityReport() {
        setReportData({});
        const { email, password } = credentials;
        const { data, headers } = await props.onGenerateEligibilityReport({ email, password });

        setReportData({
            data,
            headers
        });
    }

    function renderReport() {
        const { data, headers } = reportData;

        if (data && headers) {
            return <CSVDownload data={data} headers={headers} target="_self" />;
        }
        return null;
    }

    return (
        <div className="admin-app container is-fluid">
            <div className="panel">
                <div className="authorization-inputs">
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                autoFocus={true}
                                className="input"
                                onChange={handleInputChange}
                                placeholder="Email"
                                type="email"
                                value={credentials.email}
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope" />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                onChange={handleInputChange}
                                placeholder="Password"
                                type="password"
                                value={credentials.password}
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock" />
                            </span>
                        </p>
                    </div>
                </div>
                <div className="report-generation-buttons">
                    <button
                        className="button is-primary is-outlined completion"
                        disabled={!credentials.email || !credentials.password}
                        onClick={handleGenerateCompletionReport}
                        type="button"
                        >
                    Generate Completion Report
                    </button>
                    <button
                        className="button is-primary is-outlined eligibility"
                        disabled={!credentials.email || !credentials.password}
                        onClick={handleGenerateEligibilityReport}
                        type="button"
                        >
                    Generate Eligibility Report
                    </button>
                </div>
            </div>
            {renderReport()}
            <ToastContainer />
        </div>
    );
};

App.propTypes = {
    onGenerateCompletionReport: PropTypes.func.isRequired,
    onGenerateEligibilityReport: PropTypes.func.isRequired
};

export default App;
