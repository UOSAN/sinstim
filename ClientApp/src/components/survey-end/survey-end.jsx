import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './survey-end.scss';

const SurveyEnd = (props) => {
    const { completionCode } = props;

    const [toastId, setToastId] = useState(null);

    function handleOnNextClick() {
        const codeElement = document.getElementById('survey-code');
        const range = document.createRange();

        range.selectNodeContents(codeElement);
        const selectedContents = window.getSelection();

        selectedContents.removeAllRanges();
        selectedContents.addRange(range);
        document.execCommand('copy');

        if (!toast.isActive(toastId)) {
            const id = toast.info('Survey code copied to clipboard.', {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setToastId(id);
        }
    }

    function renderCopyButton() {
        if (document.queryCommandSupported('copy')) {
            return (
                <button
                    className="btn btn-outline-primary"
                    onClick={handleOnNextClick}
                    type="button"
                    >
                    Copy code to clipboard
                </button>
            );
        }
        return null;
    }

    return (
        <div className="survey-end jumbotron">
            <div className="survey-code-wrapper">
                <h4>Survey Code: </h4>
                <hr className="my-4" />
                <span id="survey-code">{completionCode}</span>
            </div>
            <div className="copy-code-button">
                {renderCopyButton()}
            </div>
        </div>
    );
};

SurveyEnd.propTypes = {
    completionCode: PropTypes.string.isRequired
};

export default SurveyEnd;
