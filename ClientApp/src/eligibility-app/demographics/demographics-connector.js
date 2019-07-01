import { connect } from 'react-redux';
import {
    onEndDemographicsSurvey
} from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onEndDemographicsSurvey: (answers) => dispatch(onEndDemographicsSurvey(answers))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
