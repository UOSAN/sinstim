import React from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import _some from 'lodash/some';
import produce from 'immer';

import QUESTIONS from './eligibility-survey-questions';

import './eligibility-survey.scss';

export default class EligibilitySurvey extends React.Component {
    static propTypes = {
        onEndEligibilitySurvey: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            currentQuestionIndex: 0,
            questions: _cloneDeep(QUESTIONS)
        };
    }

    handleOnNextClick = async () => {
        const { questions } = this.state;
        const { onEndEligibilitySurvey } = this.props;

        const nextQuestionIndex = this.state.currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            await onEndEligibilitySurvey(); // submit answers object of answerIds and questionIds?
        } else {
            this.setState(() => {
                return {
                    currentQuestionIndex: nextQuestionIndex
                };
            });
        }
    }

    handleOnBackClick = () => {
        this.setState((state) => {
            return {
                currentQuestionIndex: state.currentQuestionIndex - 1,
            };
        });
    }

    handleOnAnswerChanged = (evt) => {
        const { id: answerId } = evt.target;

        this.setState((previousState) => {
            return produce(previousState, (draftState) => {
                draftState.questions[draftState.currentQuestionIndex].answers.forEach((answer) => {
                    answer.checked = answer.id === answerId;
                });
            });
        });
    }

    isNextButtonDisabled() {
        const { answers } = this.state.questions[this.state.currentQuestionIndex];
        const isQuestionAnswered = _some(answers, (answer) => answer.checked);

        return !isQuestionAnswered;
    }

    isBackButtonDisabled() {
        return this.state.currentQuestionIndex === 0;
    }

    renderQuestion = () => {
        const { text, type, answers } = this.state.questions[this.state.currentQuestionIndex];

        return (
            <div className="question card">
                <span className="text card-header">{text}</span>
                <div className="form-check card-body">
                    {answers.map((answer) => { // TODO: answer id is (yes or no) this should be the value i think
                        return (
                            <div className="answer" key={answer.id} >
                                <input
                                    checked={Boolean(answer.checked)}
                                    className="form-check-input"
                                    id={answer.id}
                                    name="eligibility"
                                    onChange={this.handleOnAnswerChanged}
                                    type={type}
                                    value={answer.text}
                                    />
                                <label className="form-check-label" htmlFor={answer.id}>
                                    <span className="label-text">{answer.text}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    renderQuestionTracker() {
        const { currentQuestionIndex } = this.state;
        const { length: totalQuestions } = this.state.questions;

        return (
            <div className="question-tracker">
                <span className="badge badge-pill badge-primary">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
            </div>
        );
    }

    render() {
        const isNextButtonDisabled = this.isNextButtonDisabled();
        const isBackButtonDisabled = this.isBackButtonDisabled();

        return (
            <div className="eligibility-survey">
                {this.renderQuestion()}
                <div className="navigation-buttons">
                    <span className="question-back">
                        <button
                            className="btn btn-outline-secondary"
                            disabled={isBackButtonDisabled}
                            onClick={this.handleOnBackClick}
                            type="button"
                            >
                            Back
                        </button>
                    </span>
                    {this.renderQuestionTracker()}
                    <span className="question-next">
                        <button
                            className="btn btn-outline-primary"
                            disabled={isNextButtonDisabled}
                            onClick={this.handleOnNextClick}
                            type="button"
                            >
                            Next
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
