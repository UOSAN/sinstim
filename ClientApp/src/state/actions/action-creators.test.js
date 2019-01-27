import {
    onSaveUser
} from './action-creators';
import actions from './actions';

describe('Action Creators ->', () => {
    it('Should create an action to save a new user.', () => {
        const id = 'newUserId';
        const expectedAction = {
            type: actions.SAVE_USER,
            id
        };

        expect(onSaveUser(id)).toEqual(expectedAction);
    });
});
