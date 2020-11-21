import { connect } from 'react-redux';
import { onStartSurvey } from '../../state/actions/survey-action-creators';

const mapStateToProps = (state) => {
    return {
        id: state.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartSurvey: () => dispatch(onStartSurvey()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
