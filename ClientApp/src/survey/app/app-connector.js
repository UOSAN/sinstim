import { connect } from 'react-redux';
import {
    onSaveUser
} from '../state/actions/action-creators';

// state
const mapStateToProps = () => {
    return {
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
