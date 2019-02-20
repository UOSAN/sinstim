import { connect } from 'react-redux';
import {
    onSaveUser
} from '../../state/actions/eligibility-action-creators';

const mapStateToProps = (state) => {
    return {
        eligibilityEndTime: state.eligibilityEndTime,
        eligibilityStartTime: state.eligibilityStartTime,
        errorSavingUser: state.errorSavingUser,
        id: state.id,
        isConsented: state.isConsented
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
