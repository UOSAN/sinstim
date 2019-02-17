import React from 'react';
import PropTypes from 'prop-types';

import questions from './eligibility-survey-questions';

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
            isAcceptButtonEnabled: false,
            isSurveyOver: false
        };
    }

    handleOnAcceptClick = async () => {
        const { selectedAnswer } = this.state;
        const { id: questionId } = questions[this.state.currentQuestionIndex];
        const { onSubmitEligibilitySurveyAnswer } = this.props;
        const { onEndEligibilitySurvey } = this.props;

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
                    currentQuestionIndex: nextQuestionIndex,
                    acceptButtonEnabled: false
                };
            });
        }
    }

    handleOnAnswerChanged = (evt) => {
        const { value: answer } = evt.currentTarget;

        this.setState(() => {
            return {
                selectedAnswer: answer,
                acceptButtonEnabled: true
            };
        });
    }

    renderQuestion = () => {
        const { text, type, answers } = questions[this.state.currentQuestionIndex];

        return (
            <div className="question">
                <span className="text">{text}</span>
                <div className="form-check">
                    {answers.map((answer) => {
                        return (
                            <div className="answer" key={answer.id} >
                                <input className="form-check-input" id={answer.id} name="eligibility" type={type} value={answer.text} />
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
        if (this.state.isSurveyOver) {
            return (<div>The End</div>);
        }
        return (
            <div className="eligibility-survey">
                {this.renderQuestion()}
                <span className="question-accept">
                    <button
                        className="btn btn-outline-primary"
                        disabled={this.state.isAcceptButtonEnabled}
                        onClick={this.handleOnAcceptClick}
                        type="button"
                        >
                        Accept
                    </button>
                </span>
            </div>
        );
    }
}
