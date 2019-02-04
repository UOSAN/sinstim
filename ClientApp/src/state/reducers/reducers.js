import produce from 'immer';

import consentReducers from './consent/consent-reducers';
import userReducers from './user/user-reducers';

function reducer(state = {}, action) {
    return produce(state, (draft) => {
        return {
            user: userReducers(draft.user, action),
            consent: consentReducers(draft.consent, action)
        };
    });
}
export default reducer;
