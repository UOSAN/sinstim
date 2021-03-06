import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Consent from '../../components/consent';
import Instructions from '../eligibility-instructions';
import Demographics from '../demographics';
import EligibilitySurvey from '../eligibility-survey';
import SurveyEnd from '../../components/survey-end';
import consentText from '../consent-text';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        demographicsEndTime: PropTypes.instanceOf(Date),
        demographicsStartTime: PropTypes.instanceOf(Date),
        eligibilityCompletionCode: PropTypes.string,
        eligibilityEndTime: PropTypes.instanceOf(Date),
        eligibilityStartTime: PropTypes.instanceOf(Date),
        errorSavingUser: PropTypes.bool,
        id: PropTypes.string,
        isConsented: PropTypes.bool,
        onSaveUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

        this.props.onSaveUser(mTurkId).then(() => {
            if (this.props.errorSavingUser) {
                toast.error('Error saving user id', {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        });
    }

    isValidUser = () => {
        return this.props.id != null;
    }

    shouldSeeConsent = () => {
        return !this.props.isConsented
            && !this.props.demographicsStartTime
            && !this.props.demographicsEndTime
            && !this.props.eligibilityStartTime
            && !this.props.eligibilityEndTime;
    }

    shouldSeeInstructions = () => {
        return this.props.isConsented
            && !this.props.demographicsStartTime
            && !this.props.demographicsEndTime
            && !this.props.eligibilityStartTime
            && !this.props.eligibilityEndTime;
    }

    shouldSeeDemographics = () => {
        return this.props.isConsented
            && this.props.demographicsStartTime
            && !this.props.demographicsEndTime
            && !this.props.eligibilityStartTime
            && !this.props.eligibilityEndTime;
    }

    shouldSeeEligibilitySurvey = () => {
        return this.props.isConsented
            && this.props.demographicsStartTime
            && this.props.demographicsEndTime
            && this.props.eligibilityStartTime
            && !this.props.eligibilityEndTime;
    }

    shouldSeeEligibilitySurveyEnd = () => {
        return this.props.isConsented
            && this.props.demographicsStartTime
            && this.props.demographicsEndTime
            && this.props.eligibilityStartTime
            && this.props.eligibilityEndTime;
    }

    render() {
        const surveyEndText = 'Paste this code in the mTurk window. Watch for another HIT from us in the next day or so. $1.00 bonus for completing both.';

        return (
            <>
                {this.isValidUser() && (
                    <div className="eligibility-app container is-fluid">
                        {this.shouldSeeConsent() && <Consent text={consentText} />}
                        {this.shouldSeeInstructions() && <Instructions />}
                        {this.shouldSeeDemographics() && <Demographics />}
                        {this.shouldSeeEligibilitySurvey() && <EligibilitySurvey />}
                        {this.shouldSeeEligibilitySurveyEnd() && <SurveyEnd completionCode={this.props.eligibilityCompletionCode} title={surveyEndText} />}
                    </div>
                )}
                <ToastContainer />
            </>
        );
    }
}
