import React from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import _some from 'lodash/some';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
import produce from 'immer';

import QUESTIONS from './demographics-questions';

import './demographics.scss';

export default class Demographics extends React.Component {
    static propTypes = {
        onEndDemographicsSurvey: PropTypes.func.isRequired,
        onStartEligibilitySurvey: PropTypes.func.isRequired
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
            if (question.type === 'number') {
                result[question.id] = question.answers[0].value;
            } else if (question.type === 'radio') {
                result[question.id] = _find(question.answers, (answer) => {
                    return answer.checked;
                }).value;
            } else if (question.type === 'checkbox') {
                question.answers.forEach((answer) => {
                    const id = `${question.id}_${answer.id}`;

                    result[id] = answer.checked;
                });
            }
            return result;
        }, {});
    }

    handleOnNextClick = async () => {
        const { questions } = this.state;
        const { onEndDemographicsSurvey, onStartEligibilitySurvey } = this.props;

        const nextQuestionIndex = this.state.currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            const answersData = this.getAnswersData();

            await onEndDemographicsSurvey(answersData);
            await onStartEligibilitySurvey();
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

    handleOnRadioChanged = (evt) => {
        const { id: answerId } = evt.target;

        this.setState((previousState) => {
            return produce(previousState, (draftState) => {
                draftState.questions[draftState.currentQuestionIndex].answers.forEach((answer) => {
                    answer.checked = answer.id === answerId;
                });
            });
        });
    }

    handleOnCheckboxChanged = (evt) => {
        const { id: answerId, checked: newCheckedState } = evt.target;

        this.setState((previousState) => {
            return produce(previousState, (draftState) => {
                draftState.questions[draftState.currentQuestionIndex].answers.forEach((answer) => {
                    if (answer.id === answerId) {
                        answer.checked = newCheckedState;
                    }
                });
            });
        });
    }

    handleOnNumberChanged = (evt) => {
        const { valueAsNumber: value } = evt.target;

        this.setState((previousState) => {
            return produce(previousState, (draftState) => {
                draftState.questions[draftState.currentQuestionIndex].answers.forEach((answer) => {
                    answer.value = value;
                });
            });
        });
    }

    isNextButtonDisabled() {
        const { answers, type } = this.state.questions[this.state.currentQuestionIndex];
        let isQuestionAnswered = false;

        if (type === 'radio' || type === 'checkbox') {
            isQuestionAnswered = _some(answers, (answer) => answer.checked);
        } else if (type === 'number') {
            isQuestionAnswered = _some(answers, (answer) => answer.value >= 18);
        }

        return !isQuestionAnswered;
    }

    isBackButtonDisabled() {
        return this.state.currentQuestionIndex === 0;
    }

    renderNumberInput(type, answer) {
        return (
            <div className="answer" key={answer.id}>
                <span className="label-text">{answer.text}:</span>
                <input
                    checked={Boolean(answer.checked)}
                    className="input"
                    id={answer.id}
                    max="110"
                    min="18"
                    name="demographics"
                    onChange={this.handleOnNumberChanged}
                    type={type}
                    value={answer.value}
                    />
            </div>
        );
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
                        if (type === 'number') {
                            return this.renderNumberInput(type, answer);
                        }
                        return (
                            <div className="answer" key={answer.id} >
                                <input
                                    checked={Boolean(answer.checked)}
                                    className="radio"
                                    id={answer.id}
                                    name="demographics"
                                    onChange={type === 'radio' ? this.handleOnRadioChanged : this.handleOnCheckboxChanged}
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
            <div className="demographics card">
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
