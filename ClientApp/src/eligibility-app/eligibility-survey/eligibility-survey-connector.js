import { connect } from 'react-redux';
import {
    onEndEligibilitySurvey
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
        onEndEligibilitySurvey: () => dispatch(onEndEligibilitySurvey())
        // onSubmitEligibilitySurveyAnswer: PropTypes.func.isRequired
    };
};

export default connect(
    null,
    mapDispatchToProps
);
