/* eslint-disable sort-keys */
import axios from 'axios';
import reportService from './../../services/report-service';

import actions from './actions';
import {
    requestErrored,
    requestInProgress
} from './common-action-creators';

const generateEligibilityCompletionReportComplete = () => {
    return {
        type: actions.FETCHING_ELIGIBILITY_COMPLETION_REPORT_DATA_COMPLETE
    };
};

export const onGenerateEligibilityCompletionReport = () => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.get('/api/Admin/Eligibility/Completion')
            .then((response) => {
                dispatch(generateEligibilityCompletionReportComplete());
                return reportService.processEligibilityCompletionReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};

const generateInvitationReportComplete = () => {
    return {
        type: actions.FETCHING_INVITATION_REPORT_DATA_COMPLETE
    };
};

export const onGenerateInvitationReport = () => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.get('/api/Admin/Invitation')
            .then((response) => {
                dispatch(generateInvitationReportComplete());
                return reportService.processInvitationReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};

const generateProgressReportComplete = () => {
    return {
        type: actions.FETCHING_PROGRESS_REPORT_DATA_COMPLETE
    };
};

export const onGenerateProgressReport = () => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.get('/api/Admin/Status')
            .then((response) => {
                dispatch(generateProgressReportComplete());
                return reportService.processProgressReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};

const generateSurveyCompletionReportComplete = () => {
    return {
        type: actions.FETCHING_SURVEY_COMPLETION_REPORT_DATA_COMPLETE
    };
};

export const onGenerateSurveyCompletionReport = () => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.get('/api/Admin/Survey/Completion')
            .then((response) => {
                dispatch(generateSurveyCompletionReportComplete());
                return reportService.processSurveyCompletionReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};
