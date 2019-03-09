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
        <div className="admin-app">
            <div className="panel">
                <div className="authorization-inputs">
                    <input
                        autoFocus={true}
                        className="email"
                        onChange={handleInputChange}
                        placeholder="email"
                        type="email"
                        value={credentials.email}
                        />
                    <input
                        className="password"
                        onChange={handleInputChange}
                        placeholder="password"
                        type="password"
                        value={credentials.password}
                        />
                </div>
                <div className="report-generation-buttons">
                    <button
                        className="btn btn-outline-primary completion"
                        disabled={!credentials.email || !credentials.password}
                        onClick={handleGenerateCompletionReport}
                        type="button"
                        >
                    Generate Completion Report
                    </button>
                    <button
                        className="btn btn-outline-primary eligibility"
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
