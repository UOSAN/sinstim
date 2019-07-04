import { connect } from 'react-redux';
import {
    onStartDemographicsSurvey,
    onEndDemographicsSurvey
} from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onStartDemographicsSurvey: () => dispatch(onStartDemographicsSurvey()),
        onEndDemographicsSurvey: (answers) => dispatch(onEndDemographicsSurvey(answers))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
