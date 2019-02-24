import produce from 'immer';

import Actions from '../actions/actions';
import initialState from './initial-state';

function reducer(state = initialState, action) {
    /* eslint-disable complexity */
    return produce(state, (draft) => {
        switch (action.type) {
            case Actions.NEW_USER_ERRORED:
                draft.isSavingUser = false;
                draft.errorSavingUser = action.hasErrored;
                break;
            case Actions.NEW_USER_SAVING:
                draft.isSavingUser = action.isSaving;
                break;
            case Actions.NEW_USER_SAVED:
                draft.isSavingUser = false;
                draft.errorSavingUser = false;
                draft.id = action.id;
                break;

            case Actions.START_ELIGIBILITY_SURVEY_ERRORED:
                draft.isSavingEligibilityStartTime = false;
                draft.errorSavingEligibilityStartTime = action.hasErrored;
                break;
            case Actions.START_ELIGIBILITY_SURVEY_SAVING:
                draft.isSavingEligibilityStartTime = action.isSaving;
                break;
            case Actions.START_ELIGIBILITY_SURVEY_SAVED:
                draft.isSavingEligibilityStartTime = false;
                draft.errorSavingEligibilityStartTime = false;
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                break;

            case Actions.END_ELIGIBILITY_SURVEY_ERRORED:
                draft.isSavingEligibilityEndTime = false;
                draft.errorSavingEligibilityEndTime = action.hasErrored;
                break;
            case Actions.END_ELIGIBILITY_SURVEY_SAVING:
                draft.isSavingEligibilityEndTime = action.isSaving;
                break;
            case Actions.END_ELIGIBILITY_SURVEY_SAVED:
                draft.isSavingEligibilityEndTime = false;
                draft.errorSavingEligibilityEndTime = false;
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityCompletionCode = action.eligibilityCompletionCode;
                break;

            case Actions.CONSENT_ACCEPT:
                draft.isConsented = true;
                break;
            case Actions.CONSENT_DECLINE:
                draft.isConsented = false;
                break;

            case Actions.GET_USER_ERRORED:
                draft.isGettingUser = false;
                draft.errorGettingUser = action.hasErrored;
                break;
            case Actions.GET_USER_IN_PROGRESS:
                draft.isGettingUser = action.isSaving;
                break;
            case Actions.GET_USER_COMPLETE:
                draft.isGettingUser = false;
                draft.errorGettingUser = false;
                draft.eligibilityEndTime = new Date(action.eligibilityEndTime);
                draft.eligibilityStartTime = new Date(action.eligibilityStartTime);
                break;

            default:
                return draft;
        }
    });
}
export default reducer;
