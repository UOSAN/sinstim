/* eslint-disable sort-keys */
import axios from 'axios';

import actions from './actions';

const generateCompletionReportErrored = (bool) => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_ERRORED,
        hasErrored: bool
    };
};

const generateCompletionReportInProgress = (bool) => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_IN_PROGRESS,
        isGetting: bool
    };
};

const generateCompletionReportComplete = () => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_COMPLETE
    };
};

export const onGenerateCompletionReport = () => {
    return (dispatch) => {
        dispatch(generateCompletionReportInProgress(true));

        return axios.get('/api/Admin/Completion')
            .then((response) => dispatch(generateCompletionReportComplete(response.data)))
            .catch(() => dispatch(generateCompletionReportErrored(true)));
    };
};

const generateEligibilityReportErrored = (bool) => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_ERRORED,
        hasErrored: bool
    };
};

const generateEligibilityReportInProgress = (bool) => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_IN_PROGRESS,
        isGetting: bool
    };
};

const generateEligibilityReportComplete = () => {
    return {
        type: actions.GENERATE_COMPLETION_REPORT_COMPLETE
    };
};

export const onGenerateEligibilityReport = () => {
    return (dispatch) => {
        dispatch(generateEligibilityReportInProgress(true));

        return axios.get('/api/Admin/Eligibility')
            .then((response) => dispatch(generateEligibilityReportComplete(response.data)))
            .catch(() => dispatch(generateEligibilityReportErrored(true)));
    };
};
