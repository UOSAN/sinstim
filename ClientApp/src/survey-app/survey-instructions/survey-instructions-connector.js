import { connect } from 'react-redux';
import { onStartSurvey } from '../../state/actions/survey-action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onStartSurvey: () => dispatch(onStartSurvey()),
    };
};

export default connect(
    null,
    mapDispatchToProps
);
