import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './eligibility-survey-end.scss';

export default class EligibilitySurveyEnd extends React.Component {
    static propTypes = {
        eligibilityCompletionCode: PropTypes.string.isRequired
    };

    surveyCodeRef = React.createRef();

    toastId = null;

    handleOnNextClick = () => {
        const codeElement = document.getElementById('survey-code');
        const range = document.createRange();

        range.selectNodeContents(codeElement);
        const selectedContents = window.getSelection();

        selectedContents.removeAllRanges();
        selectedContents.addRange(range);
        document.execCommand('copy');

        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.info('Survey code copied to clipboard.', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    renderCopyButton() {
        if (document.queryCommandSupported('copy')) {
            return (
                <button
                    className="btn btn-outline-primary"
                    onClick={this.handleOnNextClick}
                    type="button"
                    >
                    Copy code to clipboard
                </button>
            );
        }
        return null;
    }

    render() {
        const { eligibilityCompletionCode } = this.props;

        return (
            <div className="survey-end jumbotron">
                <div className="survey-code-wrapper">
                    <h4>Survey Code: </h4>
                    <hr className="my-4" />
                    <span id="survey-code">{eligibilityCompletionCode}</span>
                </div>
                <div className="copy-code-button">
                    {this.renderCopyButton()}
                </div>
            </div>
        );
    }
}
