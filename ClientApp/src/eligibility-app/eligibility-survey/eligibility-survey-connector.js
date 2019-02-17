import { connect } from 'react-redux';
import {
    onEndEligibilitySurvey,
    // onSubmitEligibilitySurveyAnswer
} from '../../state/actions/eligibility-action-creators';

const mapStateToProps = (state) => {
    return {
        // isConsented: state.isConsented,
        // errorSavingUser: state.errorSavingUser,
        // id: state.id
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
    null,
    mapDispatchToProps
);
