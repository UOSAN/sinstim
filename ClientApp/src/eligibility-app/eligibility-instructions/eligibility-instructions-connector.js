import { connect } from 'react-redux';
import { onStartEligibilitySurvey } from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onStartEligibilitySurvey: () => dispatch(onStartEligibilitySurvey()),
    };
};

export default connect(
    null,
    mapDispatchToProps
);
