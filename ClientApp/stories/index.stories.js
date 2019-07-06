import React from 'react';
import { storiesOf } from '@storybook/react';

import Demographics from '../src/eligibility-app/demographics/demographics';
import SurveyQuestions from '../src/survey-app/survey/survey';

import 'bulma/css/bulma.min.css/';

const onEndDemographicsSurvey = (answersData) => {
    console.log('onEndDemographicsSurvey: ', answersData);
};

const onStartEligibilitySurvey = () => {
    console.log('onStartEligibilitySurvey called');
};

const onRatePicture = ({ fileName, desirability, recognizability }) => {
    console.log('onRatePicture');
    console.log('fileName: ', fileName, 'desirability: ', desirability, 'recognizability: ', recognizability);
};

const onEndSurvey = () => {
    console.log('onEndSurvey called');
};

storiesOf('Demographics', module)
    .add('with 5 questions', () => {
        return <Demographics onEndDemographicsSurvey={onEndDemographicsSurvey} onStartEligibilitySurvey={onStartEligibilitySurvey} />;
    });

storiesOf('Picture Survey', module)
    .add('9 questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            />);
    })
    .add('8 questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1, 2, 3, 4, 5, 6, 7]}
            />);
    })
    .add('7 questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1, 2, 3, 4, 5, 6]}
            />);
    })
    .add('6 questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1, 2, 3, 4, 5]}
            />);
    })
    .add('4 questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1, 2, 3]}
            />);
    });
