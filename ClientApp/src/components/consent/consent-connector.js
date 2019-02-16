import { connect } from 'react-redux';
import { onConsentAccept, onConsentDecline } from '../../state/actions/common-action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.isConsented
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
