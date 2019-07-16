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

    async function handleGenerateEligibilityCompletionReport() {
        setReportData({});
        const { email: user, password } = credentials;
        const { data, headers } = await props.onGenerateEligibilityCompletionReport({ user, password });

        setReportData({
            data,
            headers,
        });
    }

    async function handleGenerateInvitationReport() {
        setReportData({});
        const { email: user, password } = credentials;
        const { data, headers } = await props.onGenerateInvitationReport({ user, password });

        setReportData({
            data,
            headers
        });
    }

    async function handleGenerateProgressReport() {
        setReportData({});
        const { email: user, password } = credentials;
        const { data, headers } = await props.onGenerateProgressReport({ user, password });

        setReportData({
            data,
            headers
        });
    }

    async function handleGenerateSurveyCompletionReport() {
        setReportData({});
        const { email: user, password } = credentials;
        const { data, headers } = await props.onGenerateSurveyCompletionReport({ user, password });

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
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title is-centered">
                    Admin Panel
                    </div>
                </div>
                <div className="card-content">
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
                            className="button is-primary is-outlined eligibility-completion"
                            disabled={!credentials.email || !credentials.password}
                            onClick={handleGenerateEligibilityCompletionReport}
                            type="button"
                            >
                            Generate Eligibility Completion Report
                        </button>
                        <button
                            className="button is-primary is-outlined invitation"
                            disabled={!credentials.email || !credentials.password}
                            onClick={handleGenerateInvitationReport}
                            type="button"
                            >
                            Generate Survey Invitation Report
                        </button>
                        <button
                            className="button is-primary is-outlined progress-report"
                            disabled={!credentials.email || !credentials.password}
                            onClick={handleGenerateProgressReport}
                            type="button"
                            >
                            Generate Survey Progress Report
                        </button>
                        <button
                            className="button is-primary is-outlined survey-completion"
                            disabled={!credentials.email || !credentials.password}
                            onClick={handleGenerateSurveyCompletionReport}
                            type="button"
                            >
                            Generate Survey Completion Report
                        </button>
                    </div>
                </div>
            </div>
            {renderReport()}
            <ToastContainer />
        </div>
    );
};

App.propTypes = {
    onGenerateEligibilityCompletionReport: PropTypes.func.isRequired,
    onGenerateInvitationReport: PropTypes.func.isRequired,
    onGenerateProgressReport: PropTypes.func.isRequired,
    onGenerateSurveyCompletionReport: PropTypes.func.isRequired
};

export default App;
