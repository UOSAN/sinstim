import { connect } from 'react-redux';
import { onEndSurvey, onRatePicture } from '../../state/actions/survey-action-creators';

const mapStateToProps = (state) => {
    return {
        assignedCategory: state.assignedCategory,
        surveyQuestionNumbers: state.surveyQuestionNumbers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEndSurvey: () => dispatch(onEndSurvey()),
        onRatePicture: (pictureData) => dispatch(onRatePicture(pictureData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
