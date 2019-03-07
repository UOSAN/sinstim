import { connect } from 'react-redux';
import {
    onEndEligibilitySurvey
} from '../../state/actions/eligibility-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onEndEligibilitySurvey: (answers) => dispatch(onEndEligibilitySurvey(answers))
    };
};

export default connect(
    null,
    mapDispatchToProps
);
