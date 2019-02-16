import { connect } from 'react-redux';
import {
    onSaveUser
} from '../../state/actions/eligibility-action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.isConsented,
        eligibilityStartTime: state.eligibilityStartTime,
        errorSavingUser: state.errorSavingUser,
        id: state.id
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
