import Actions from './../actions/actions';

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.SAVE_USER:
            console.log("SAVE USER CLICKED");
            return state;
        default:
            return state;
    }
};

export default reducer;
