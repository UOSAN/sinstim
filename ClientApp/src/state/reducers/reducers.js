import produce from 'immer';

import Actions from '../actions/actions';
import initialState from './initial-state';

function reducer(state = initialState, action) {
    /* eslint-disable complexity */
    return produce(state, (draft) => {
        switch (action.type) {
            case Actions.REQUEST_ERRORED:
                draft.requestInProgress = false;
                draft.requestErrored = action.requestErrored;
                break;
            case Actions.REQUEST_IN_PROGRESS:
                draft.requestInProgress = action.requestInProgress;
                break;

            case Actions.NEW_USER_SAVED:
                draft.requestInProgress = false;
                draft.requestErrored = false;
                draft.id = action.id;
                break;

            case Actions.START_ELIGIBILITY_SURVEY_SAVED:
                draft.requestInProgress = false;
                draft.requestErrored = false;
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                break;

            case Actions.END_ELIGIBILITY_SURVEY_SAVED:
                draft.requestInProgress = false;
                draft.requestErrored = false;
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityCompletionCode = action.eligibilityCompletionCode;
                break;

            case Actions.CONSENT_ACCEPT:
                draft.isConsented = true;
                break;
            case Actions.CONSENT_DECLINE:
                draft.isConsented = false;
                break;

            case Actions.GET_USER_COMPLETE:
                draft.requestInProgress = false;
                draft.requestErrored = false;
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                draft.id = action.id;
                break;

            case Actions.START_SURVEY_SAVED:
                draft.requestInProgress = false;
                draft.requestErrored = false;
                draft.surveyStartTime = new Date(action.surveyStartTime);
                draft.assignedCategory = action.assignedCategory;
                break;

            case Actions.FETCHING_REPORT_DATA_ERRORED:
                draft.isFetchingReportData = false;
                draft.errorFetchingReportData = action.hasErrored;
                break;
            case Actions.FETCHING_REPORT_DATA_IN_PROGRESS:
                draft.isFetchingReportData = action.isFetching;
                break;

            case Actions.FETCHING_COMPLETION_REPORT_DATA_COMPLETE:
                draft.isFetchingReportData = false;
                draft.errorFetchingReportData = false;
                break;

            case Actions.FETCHING_ELIGIBILITY_REPORT_DATA_COMPLETE:
                draft.isFetchingReportData = false;
                draft.errorFetchingReportData = false;
                break;

            default:
                return draft;
        }
    });
}
export default reducer;
