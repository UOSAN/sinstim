import {
    onSaveUser
} from '../action-creators';
import superagent from 'superagent';

jest.mock('superagent');

beforeEach(() => {
    jest.clearAllMocks();
});

it('Should create an action to save a new user.', async () => {
    superagent.post.mockImplementation(() => {
        return {
            set: jest.fn().mockImplementation(() => {
                return {
                    send: jest.fn().mockImplementation((userId) => {
                        return Promise.resolve(userId);
                    })
                };
            })
        };
    });
    const dispatch = jest.fn();

    await onSaveUser('newUserId')(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, { isSaving: true, type: 'NEW_USER_SAVING' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { id: 'newUserId', type: 'NEW_USER_SAVED' });
});
