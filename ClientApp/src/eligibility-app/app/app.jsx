import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Consent from '../../components/consent';
import Instructions from '../eligibility-instructions';
import EligibilitySurvey from '../eligibility-survey';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        eligibilityStartTime: PropTypes.instanceOf(Date),
        errorSavingUser: PropTypes.bool,
        id: PropTypes.string,
        isConsented: PropTypes.bool,
        onSaveUser: PropTypes.func.isRequired
    };

    state = {
        isUserSaved: false
    };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

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
        return !this.props.isConsented && !this.props.eligibilityStartTime;
    }

    shouldSeeInstructions = () => {
        return this.props.isConsented && !this.props.eligibilityStartTime;
    }

    shouldSeeEligibilitySurvey = () => {
        return this.props.isConsented && this.props.eligibilityStartTime;
    }

    render() {
        return (
            <>
                {this.isValidUser() && (
                    <div className="eligibility-app">
                        {this.shouldSeeConsent() && <Consent {...this.props} />}
                        {this.shouldSeeInstructions() && <Instructions />}
                        {this.shouldSeeEligibilitySurvey() && <EligibilitySurvey />}
                    </div>
                )}
                <ToastContainer />
            </>
        );
    }
}
