import { connect } from 'react-redux';
import { onConsentAccept, onConsentDecline } from '../../state/actions/action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.consent.isConsented
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
