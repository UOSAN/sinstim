import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Consent from '../../components/consent';
import Instructions from '../eligibility-instructions';
import EligibilitySurvey from '../eligibility-survey';
import EligibilitySurveyEnd from '../eligibility-survey-end';
import consentText from '../consent-text';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        eligibilityEndTime: PropTypes.instanceOf(Date),
        eligibilityStartTime: PropTypes.instanceOf(Date),
        errorSavingUser: PropTypes.bool,
        id: PropTypes.string,
        isConsented: PropTypes.bool,
        onSaveUser: PropTypes.func.isRequired,
        setConsentText: PropTypes.func.isRequired
    };

    state = {
        isUserSaved: false
    };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

        this.props.setConsentText(consentText);

        this.props.onSaveUser(mTurkId).then(() => {
            if (this.props.errorSavingUser) {
                toast.error('Error saving user id', {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else {
                this.setState(() => {
                    return {
                        isUserSaved: true
                    };
                });
            }
        });
    }

    isValidUser = () => {
        return this.props.id != null && this.state.isUserSaved;
    }

    shouldSeeConsent = () => {
        return !this.props.isConsented && !this.props.eligibilityStartTime && !this.props.eligibilityEndTime;
    }

    shouldSeeInstructions = () => {
        return this.props.isConsented && !this.props.eligibilityStartTime && !this.props.eligibilityEndTime;
    }

    shouldSeeEligibilitySurvey = () => {
        return this.props.isConsented && this.props.eligibilityStartTime && !this.props.eligibilityEndTime;
    }

    shouldSeeEligibilitySurveyEnd = () => {
        return this.props.isConsented && this.props.eligibilityStartTime && this.props.eligibilityEndTime;
    }

    render() {
        return (
            <>
                {this.isValidUser() && (
                    <div className="eligibility-app">
                        {this.shouldSeeConsent() && <Consent />}
                        {this.shouldSeeInstructions() && <Instructions />}
                        {this.shouldSeeEligibilitySurvey() && <EligibilitySurvey />}
                        {this.shouldSeeEligibilitySurveyEnd() && <EligibilitySurveyEnd />}
                    </div>
                )}
                <ToastContainer />
            </>
        );
    }
}
