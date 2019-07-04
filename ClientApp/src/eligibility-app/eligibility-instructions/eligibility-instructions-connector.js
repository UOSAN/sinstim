import { connect } from 'react-redux';
import { onStartDemographicsSurvey } from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onStartDemographicsSurvey: () => dispatch(onStartDemographicsSurvey()),
    };
};

export default connect(
    null,
    mapDispatchToProps
);
