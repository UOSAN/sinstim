import actions from './actions';

export const onSaveUser = (id) => {
    return { type: actions.SAVE_USER, id }
}