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
            const id = toast('Survey code copied to clipboard.', {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setToastId(id);
        }
    }

    function renderCopyButton() {
        if (document.queryCommandSupported('copy')) {
            return (
                <button
                    className="button is-primary is-outlined"
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
        <div className="survey-end card">
            <div className="card-header">
                <div className="card-header-title is-centered">
                    Survey Code:
                </div>
            </div>
            <div className="card-content" id="survey-code">
                {completionCode}
            </div>
            <div className="copy-code-button card-footer">
                {renderCopyButton()}
            </div>
        </div>
    );
};

SurveyEnd.propTypes = {
    completionCode: PropTypes.string.isRequired
};

export default SurveyEnd;
