import React from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import _some from 'lodash/some';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
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

    getAnswersData = () => {
        const { questions } = this.state;

        return _reduce(questions, (result, question) => {
            result[question.id] = _find(question.answers, (answer) => {
                return answer.checked;
            }).value;
            return result;
        }, {});
    }

    handleOnNextClick = async () => {
        const { questions } = this.state;
        const { onEndEligibilitySurvey } = this.props;

        const nextQuestionIndex = this.state.currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            const answersData = this.getAnswersData();

            await onEndEligibilitySurvey(answersData);
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
            <>
                <div className="card-header">
                    <div className="card-header-title is-centered">{text}</div>
                </div>
                <div className="card-content">
                    {answers.map((answer) => {
                        return (
                            <div className="answer" key={answer.id} >
                                <input
                                    checked={Boolean(answer.checked)}
                                    className="radio"
                                    id={answer.id}
                                    name="eligibility"
                                    onChange={this.handleOnAnswerChanged}
                                    type={type}
                                    value={answer.value}
                                    />
                                <label className="radio" htmlFor={answer.id}>
                                    <span className="label-text">{answer.text}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    renderQuestionTracker() {
        const { currentQuestionIndex } = this.state;
        const { length: totalQuestions } = this.state.questions;

        return (
            <div className="question-tracker">
                <span className="tag is-medium">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
            </div>
        );
    }

    render() {
        const isNextButtonDisabled = this.isNextButtonDisabled();
        const isBackButtonDisabled = this.isBackButtonDisabled();

        return (
            <div className="eligibility-survey card">
                {this.renderQuestion()}
                <div className="navigation-buttons card-footer">
                    <span className="question-back">
                        <button
                            className="button is-dark is-outlined"
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
                            className="button is-primary is-outlined"
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
