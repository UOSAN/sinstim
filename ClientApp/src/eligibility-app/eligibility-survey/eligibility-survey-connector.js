import { connect } from 'react-redux';
import {
    onEndEligibilitySurvey
} from '../../state/actions/eligibility-action-creators';

const mapStateToProps = (state) => {
    return {
        eligibilityCompletionCode: state.eligibilityCompletionCode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEndEligibilitySurvey: (answers) => dispatch(onEndEligibilitySurvey(answers))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
