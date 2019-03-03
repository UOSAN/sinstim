import { connect } from 'react-redux';
import { onGetUser } from '../../state/actions/survey-action-creators';
import { setConsentText } from '../../state/actions/common-action-creators';

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
        onGetUser: (id) => dispatch(onGetUser(id)),
        setConsentText: (consentText) => dispatch(setConsentText(consentText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);