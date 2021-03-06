import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Beforeunload } from 'react-beforeunload';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import consentText from '../consent-text';
import Consent from '../../components/consent';
import Instructions from '../survey-instructions';
import SurveyLoadingBar from '../survey-loading-bar';
import Survey from '../survey';
import SurveyEnd from '../../components/survey-end';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        completionCode: PropTypes.string,
        eligibilityEndTime: PropTypes.instanceOf(Date),
        eligibilityStartTime: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        isConsented: PropTypes.bool,
        isLoadingSurvey: PropTypes.bool,
        onGetUser: PropTypes.func.isRequired,
        surveyEndTime: PropTypes.instanceOf(Date),
        surveyStartTime: PropTypes.instanceOf(Date),
    };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

        this.props.onGetUser(mTurkId).then((success) => {
            if (!success) {
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
        return this.isValidUser()
            && this.props.isConsented
            && !this.props.surveyStartTime
            && !this.props.surveyEndTime;
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

    isLoadingSurvey = () => {
        return this.props.isLoadingSurvey;
    }

    handleBeforeUnload = () => {
        return 'Are you sure?';
    }

    render() {
        return (
            <>
                {this.isValidUser() && (
                    <Beforeunload onBeforeunload={this.handleBeforeUnload}>
                        <div className="survey-app container is-fluid">
                            {this.shouldSeeConsent() && <Consent text={consentText} />}
                            {this.shouldSeeInstructions() && !this.isLoadingSurvey() && <Instructions />}
                            {this.isLoadingSurvey() && <SurveyLoadingBar />}
                            {this.shouldSeeSurvey() && <Survey />}
                            {this.shouldSeeSurveyEnd() && <SurveyEnd completionCode={this.props.completionCode} />}
                        </div>
                    </Beforeunload>
                )}
                <ToastContainer />
            </>
        );
    }
}
