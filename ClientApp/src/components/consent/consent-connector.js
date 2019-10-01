import { connect } from 'react-redux';
import {
    onConsentAccept,
    onConsentDecline,
    onRejectUser
} from '../../state/actions/common-action-creators';

const mapStateToProps = (state) => {
    return {
        isConsented: state.isConsented
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConsentAccept: () => dispatch(onConsentAccept()),
        onConsentDecline: () => dispatch(onConsentDecline()),
        onRejectUser: () => dispatch(onRejectUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
