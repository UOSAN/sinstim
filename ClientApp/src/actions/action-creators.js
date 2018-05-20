import actions from './actions';

import superAgent from 'superagent';

// function myThunkActionCreator(someValue) {
//     return (dispatch, getState) => {
//         dispatch({type : "REQUEST_STARTED"});

//         superAgent.post("/someEndpoint", {data : someValue})
//             .then(
//                 response => dispatch({type : "REQUEST_SUCCEEDED", payload : response}),
//                 error => dispatch({type : "REQUEST_FAILED", error : error})
//             );
//     };
// }

export const onSaveUser = (id) => {
    return { type: actions.SAVE_USER, id }
}