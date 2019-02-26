import { connect } from 'react-redux';
import {
    onGenerateCompletionReport,
    onGenerateEligibilityReport
} from '../../state/actions/admin-action-creators';

// const mapStateToProps = (state) => {
//     return {
//         consentText: state.consentText,
//         isConsented: state.isConsented
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        onGenerateCompletionReport: (credentials) => dispatch(onGenerateCompletionReport(credentials)),
        onGenerateEligibilityReport: (credentials) => dispatch(onGenerateEligibilityReport(credentials))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
