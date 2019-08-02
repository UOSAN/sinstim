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

export const onGenerateEligibilityCompletionReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Eligibility/Completion', { user, password })
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

export const onGenerateInvitationReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Invitation', { user, password })
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

export const onGenerateProgressReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Status', { user, password })
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

export const onGenerateSurveyCompletionReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Survey/Completion', { user, password })
            .then((response) => {
                dispatch(generateSurveyCompletionReportComplete());
                return reportService.processSurveyCompletionReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};

const generateDesirabilityReportComplete = () => {
    return {
        type: actions.FETCHING_DESIRABILITY_REPORT_DATA_COMPLETE
    };
};

export const onGenerateDesirabilityReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Survey/Desirability', { user, password })
            .then((response) => {
                dispatch(generateDesirabilityReportComplete());
                return reportService.processDesirabilityReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};

const generateRecognizabilityReportComplete = () => {
    return {
        type: actions.FETCHING_RECOGNIZABILITY_REPORT_DATA_COMPLETE
    };
};

export const onGenerateRecognizabilityReport = ({ user, password }) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        return axios.post('/api/Admin/Survey/Recognizability', { user, password })
            .then((response) => {
                dispatch(generateRecognizabilityReportComplete());
                return reportService.processRecognizabilityReportData(response.data);
            })
            .catch(() => dispatch(requestErrored(true)));
    };
};
