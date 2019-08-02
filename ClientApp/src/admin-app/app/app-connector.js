import { connect } from 'react-redux';
import {
    onGenerateDesirabilityReport,
    onGenerateEligibilityCompletionReport,
    onGenerateInvitationReport,
    onGenerateProgressReport,
    onGenerateRecognizabilityReport,
    onGenerateSurveyCompletionReport
} from '../../state/actions/admin-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onGenerateDesirabilityReport: (credentials) => dispatch(onGenerateDesirabilityReport(credentials)),
        onGenerateEligibilityCompletionReport: (credentials) => dispatch(onGenerateEligibilityCompletionReport(credentials)),
        onGenerateInvitationReport: (credentials) => dispatch(onGenerateInvitationReport(credentials)),
        onGenerateProgressReport: (credentials) => dispatch(onGenerateProgressReport(credentials)),
        onGenerateRecognizabilityReport: (credentials) => dispatch(onGenerateRecognizabilityReport(credentials)),
        onGenerateSurveyCompletionReport: (credentials) => dispatch(onGenerateSurveyCompletionReport(credentials))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
