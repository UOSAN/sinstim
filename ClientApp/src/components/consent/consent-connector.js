import { connect } from 'react-redux';
import { onSubmitConsent } from '../../state/actions/action-creators';

// (state)
const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitConsent: () => dispatch(onSubmitConsent()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
