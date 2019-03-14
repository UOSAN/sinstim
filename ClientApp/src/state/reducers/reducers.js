import produce from 'immer';

import Actions from '../actions/actions';
import initialState from './initial-state';

function setRequestComplete(draft) {
    draft.requestInProgress = false;
    draft.requestErrored = false;
}

function reducer(state = initialState, action) {
    /* eslint-disable complexity */
    return produce(state, (draft) => {
        switch (action.type) {
            // common reducers
            case Actions.CONSENT_ACCEPT:
                draft.isConsented = true;
                break;
            case Actions.CONSENT_DECLINE:
                draft.isConsented = false;
                break;

            case Actions.REQUEST_ERRORED:
                draft.requestInProgress = false;
                draft.requestErrored = action.requestErrored;
                break;
            case Actions.REQUEST_IN_PROGRESS:
                draft.requestInProgress = action.requestInProgress;
                break;
            // eligibility reducers
            case Actions.NEW_USER_SAVED:
                setRequestComplete(draft);
                draft.id = action.id;
                break;

            case Actions.START_ELIGIBILITY_SURVEY_SAVED:
                setRequestComplete(draft);
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                break;

            case Actions.END_ELIGIBILITY_SURVEY_SAVED:
                setRequestComplete(draft);
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityCompletionCode = action.eligibilityCompletionCode;
                break;
            // survey reducers
            case Actions.GET_USER_COMPLETE:
                setRequestComplete(draft);
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                draft.id = action.id;
                break;

            case Actions.START_SURVEY_SAVED:
                setRequestComplete(draft);
                draft.surveyStartTime = new Date(action.surveyStartTime);
                draft.assignedCategory = action.assignedCategory;
                draft.surveyQuestionNumbers = action.surveyQuestionNumbers;
                break;

            case Actions.RATE_PICTURE_SAVED:
                setRequestComplete(draft);
                break;

            case Actions.END_SURVEY_SAVED:
                setRequestComplete(draft);
                draft.surveyEndTime = new Date(action.surveyEndTime);
                draft.surveyCompletionCode = action.surveyCompletionCode;
                break;
            // admin panel reducers
            case Actions.FETCHING_ELIGIBILITY_COMPLETION_REPORT_DATA_COMPLETE:
                setRequestComplete(draft);
                break;

            case Actions.FETCHING_INVITATION_REPORT_DATA_COMPLETE:
                setRequestComplete(draft);
                break;

            case Actions.FETCHING_PROGRESS_REPORT_DATA_COMPLETE:
                setRequestComplete(draft);
                break;

            case Actions.FETCHING_SURVEY_COMPLETION_REPORT_DATA_COMPLETE:
                setRequestComplete(draft);
                break;


            default:
                return draft;
        }
    });
}
export default reducer;
