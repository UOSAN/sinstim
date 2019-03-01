/* eslint-disable sort-keys */
import axios from 'axios';
import reportService from './../../services/report-service';

import actions from './actions';

const fetchingReportDataErrored = (bool) => {
    return {
        type: actions.FETCHING_REPORT_DATA_ERRORED,
        hasErrored: bool
    };
};

const fetchingReportDataInProgress = (bool) => {
    return {
        type: actions.FETCHING_REPORT_DATA_IN_PROGRESS,
        isFetching: bool
    };
};

const generateCompletionReportComplete = () => {
    return {
        type: actions.FETCHING_COMPLETION_REPORT_DATA_COMPLETE
    };
};

export const onGenerateCompletionReport = () => {
    return (dispatch) => {
        dispatch(fetchingReportDataInProgress(true));

        return axios.get('/api/Admin/Completion')
            .then((response) => {
                dispatch(generateCompletionReportComplete());
                return reportService.processCompletionReportData(response.data);
            })
            .catch(() => dispatch(fetchingReportDataErrored(true)));
    };
};
const generateEligibilityReportComplete = () => {
    return {
        type: actions.FETCHING_ELIGIBILITY_REPORT_DATA_COMPLETE
    };
};

export const onGenerateEligibilityReport = () => {
    return (dispatch) => {
        dispatch(fetchingReportDataInProgress(true));

        return axios.get('/api/Admin/Eligibility')
            .then((response) => {
                dispatch(generateEligibilityReportComplete());
                return reportService.processEligibilityReportData(response.data);
            })
            .catch(() => dispatch(fetchingReportDataErrored(true)));
    };
};
