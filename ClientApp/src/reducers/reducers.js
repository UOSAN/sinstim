import Actions from './../actions/actions';

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.NEW_USER_ERRORED:
            console.log('NEW_USER_ERRORED!');
            return state;
        case Actions.NEW_USER_SAVING:
            console.log('NEW_USER_SAVING!');
            return state;
        case Actions.NEW_USER_SAVED:
            console.log('NEW_USER_SAVED: ', action.id);
            return state;
        default:
            return state;
    }
};

export default reducer;
