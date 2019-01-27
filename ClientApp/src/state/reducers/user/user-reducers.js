import Actions from './../../actions/actions';
import initialUserState from './initial-user-state';

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case Actions.NEW_USER_ERRORED:
            return Object.assign({}, state, {
                errorSavingUser: action.hasErrored,
                isSavingUser: false
            });
        case Actions.NEW_USER_SAVING:
            return Object.assign({}, state, {
                isSavingUser: action.isSaving
            });
        case Actions.NEW_USER_SAVED:
            return Object.assign({}, state, {
                errorSavingUser: false,
                id: action.id,
                isSavingUser: false
            });
        default:
            return state;
    }
};

export default userReducer;
