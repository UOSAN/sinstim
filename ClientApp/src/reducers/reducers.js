import userReducers from './user/user-reducers';

function reducer(state = {}, action) {
    return {
        user : userReducers(state.user, action)
    };
}
export default reducer;
