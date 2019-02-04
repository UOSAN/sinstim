import { connect } from 'react-redux';
import {
    onSaveUser
} from '../../state/actions/action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.consent.isConsented
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
