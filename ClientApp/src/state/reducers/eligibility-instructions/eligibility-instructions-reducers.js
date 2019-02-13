import produce from 'immer';
import Actions from '../../actions/actions';

const eligibilityInstructionsReducers = (state = {}, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case Actions.ELIGIBILITY_INSTRUCTIONS_ACCEPT:
                draft.hasAcceptedEligibilityInstructions = true;
                break;
            default:
                return draft;
        }
    });
};

export default eligibilityInstructionsReducers;
