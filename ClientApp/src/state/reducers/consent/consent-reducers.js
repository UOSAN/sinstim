import produce from 'immer';
import Actions from './../../actions/actions';

const consentReducer = (state = {}, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
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
};

export default consentReducer;
