import produce from 'immer';

import Actions from './../../actions/actions';
import initialUserState from './initial-user-state';

const userReducers = (state = initialUserState, action) => {
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
            default:
                return draft;
        }
    });
};

export default userReducers;
