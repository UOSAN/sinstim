import { connect } from 'react-redux';
import {
    onSaveUser
} from '../../state/actions/action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.isConsented,
        errorSavingUser: state.errorSavingUser,
        userId: state.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveUser: (id) => dispatch(onSaveUser(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
