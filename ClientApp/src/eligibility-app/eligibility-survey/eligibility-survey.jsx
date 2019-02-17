import React from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import _some from 'lodash/some';
import produce from 'immer';

import QUESTIONS from './eligibility-survey-questions';

import './eligibility-survey.scss';

export default class EligibilitySurvey extends React.Component {
    static propTypes = {
        onEndEligibilitySurvey: PropTypes.func.isRequired,
        onSubmitEligibilitySurveyAnswer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            currentQuestionIndex: 0,
            isSurveyOver: false,
            questions: _cloneDeep(QUESTIONS)
        };
    }

    handleOnNextClick = async () => {
        const { selectedAnswer, questions } = this.state;
        const { id: questionId } = questions[this.state.currentQuestionIndex];
        const { onEndEligibilitySurvey, onSubmitEligibilitySurveyAnswer } = this.props;

        await onSubmitEligibilitySurveyAnswer({ questionId, selectedAnswer });

        const nextQuestionIndex = this.state.currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            await onEndEligibilitySurvey();
            this.setState(() => {
                return {
                    isSurveyOver: true
                };
            });
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
            <div className="question">
                <span className="text">{text}</span>
                <div className="form-check">
                    {answers.map((answer) => {
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

    render() {
        const isNextButtonDisabled = this.isNextButtonDisabled();
        const isBackButtonDisabled = this.isBackButtonDisabled();

        if (this.state.isSurveyOver) {
            return (<div>The End</div>);
        }
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
