import { connect } from 'react-redux';
import {
    onStartSurvey
} from '../../state/actions/common-action-creators';

const mapStateToProps = (state) => {
    return {
        eligibilityEndTime: state.eligibilityEndTime,
        eligibilityStartTime: state.eligibilityStartTime,
        errorStartingSurvey: state.errorStartingSurvey,
        id: state.id,
        isConsented: state.isConsented,
        surveyEndTime: state.surveyEndTime,
        surveyStartTime: state.surveyStartTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartSurvey: (id) => dispatch(onStartSurvey(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
