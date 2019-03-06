import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Consent from '../../components/consent';
import consentText from '../consent-text';

import Instructions from '../survey-instructions';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        eligibilityEndTime: PropTypes.instanceOf(Date),
        eligibilityStartTime: PropTypes.instanceOf(Date),
        errorStartingSurvey: PropTypes.bool,
        id: PropTypes.string,
        isConsented: PropTypes.bool,
        onGetUser: PropTypes.func.isRequired,
        surveyEndTime: PropTypes.instanceOf(Date),
        surveyStartTime: PropTypes.instanceOf(Date),
    };

    state = { };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

        this.props.onGetUser(mTurkId).then(() => {
            if (this.props.errorStartingSurvey) {
                toast.error('Error starting survey', {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        });
    }

    isValidUser = () => {
        return this.props.id != null
            && this.props.eligibilityStartTime
            && this.props.eligibilityEndTime;
    }

    shouldSeeConsent = () => {
        return this.isValidUser() && !this.props.isConsented;
    }

    shouldSeeInstructions = () => {
        return this.isValidUser() && this.props.isConsented;
    }

    shouldSeeSurvey = () => {
        return this.isValidUser()
            && this.props.isConsented
            && this.props.surveyStartTime
            && !this.props.surveyEndTime;
    }

    shouldSeeSurveyEnd = () => {
        return this.isValidUser()
            && this.props.isConsented
            && this.props.surveyStartTime
            && this.props.surveyEndTime;
    }

    render() {
        return (
            <>
                {this.isValidUser() && (
                    <div className="survey-app">
                        {this.shouldSeeConsent() && <Consent text={consentText} />}
                        {this.shouldSeeInstructions() && <Instructions />}
                        {/* {this.shouldSeeSurvey() && <Survey />}
                        {this.shouldSeeSurveyEnd() && <SurveyEnd />} */}
                    </div>
                )}
                <ToastContainer />
            </>
        );
    }
}
