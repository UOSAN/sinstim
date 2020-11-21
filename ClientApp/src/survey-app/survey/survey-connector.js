import { connect } from 'react-redux';
import { onEndSurvey, onRatePicture } from '../../state/actions/survey-action-creators';

const mapStateToProps = (state) => {
    return {
        assignedCategory: state.assignedCategory,
        id: state.id,
        picturesToRate: state.picturesToRate,
        pictureHost: state.pictureHost,
        requestInProgress: state.requestInProgress
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
