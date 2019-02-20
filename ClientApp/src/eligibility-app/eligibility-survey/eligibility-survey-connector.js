import { connect } from 'react-redux';
import {
    onEndEligibilitySurvey,
    // onSubmitEligibilitySurveyAnswer
} from '../../state/actions/eligibility-action-creators';

const mapStateToProps = (state) => {
    return {
        eligibilityCompletionCode: state.eligibilityCompletionCode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEndEligibilitySurvey: () => dispatch(onEndEligibilitySurvey()),
        onSubmitEligibilitySurveyAnswer: () => {}
        // onSubmitEligibilitySurveyAnswer: () => dispatch(onSubmitEligibilitySurveyAnswer())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
