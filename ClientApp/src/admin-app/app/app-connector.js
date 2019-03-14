import { connect } from 'react-redux';
import {
    onGenerateEligibilityCompletionReport,
    onGenerateInvitationReport,
    onGenerateProgressReport,
    onGenerateSurveyCompletionReport
} from '../../state/actions/admin-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onGenerateEligibilityCompletionReport: (credentials) => dispatch(onGenerateEligibilityCompletionReport(credentials)),
        onGenerateInvitationReport: (credentials) => dispatch(onGenerateInvitationReport(credentials)),
        onGenerateProgressReport: (credentials) => dispatch(onGenerateProgressReport(credentials)),
        onGenerateSurveyCompletionReport: (credentials) => dispatch(onGenerateSurveyCompletionReport(credentials))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
