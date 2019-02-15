import produce from 'immer';

import Actions from '../actions/actions';
import initialState from './initial-state';

function reducer(state = initialState, action) {
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
                draft.userId = action.id;
                break;

            case Actions.ELIGIBILITY_INSTRUCTIONS_ACCEPT:
                draft.hasAcceptedEligibilityInstructions = true;
                break;

            case Actions.CONSENT_ACCEPT:
                draft.isConsented = true;
                break;
            case Actions.CONSENT_DECLINE:
                draft.isConsented = false;
                break;

            default:
                return draft;
        }
    });
}
export default reducer;
