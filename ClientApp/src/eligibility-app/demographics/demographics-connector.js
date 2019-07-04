import { connect } from 'react-redux';
import {
    onStartDemographicsSurvey,
    onEndDemographicsSurvey,
    onStartEligibilitySurvey
} from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onStartDemographicsSurvey: () => dispatch(onStartDemographicsSurvey()),
        onEndDemographicsSurvey: (answers) => dispatch(onEndDemographicsSurvey(answers)),
        onStartEligibilitySurvey: () => dispatch(onStartEligibilitySurvey())
    };
};

export default connect(
    null,
    mapDispatchToProps
);
