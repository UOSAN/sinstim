import { connect } from 'react-redux';
import { onConsentAccept, onConsentDecline } from '../../state/actions/action-creators';

// (state)
const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConsentAccept: () => dispatch(onConsentAccept()),
        onConsentDecline: () => dispatch(onConsentDecline())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
