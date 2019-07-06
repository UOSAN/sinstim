import React from 'react';
import { storiesOf } from '@storybook/react';

import Demographics from '../src/eligibility-app/demographics/demographics';
import SurveyQuestions from '../src/survey-app/survey/survey';

import 'bulma/css/bulma.min.css/';

const onEndDemographicsSurvey = (answersData) => {
    console.log(answersData);
};

const onStartEligibilitySurvey = () => {
    console.log('onStartEligibilitySurvey called');
};

const onRatePicture = ({ fileName, desirability, recognizability }) => {
    console.log('fileName: ', fileName, 'desirability: ', desirability, 'recognizability: ', recognizability);
};

const onEndSurvey = () => {
    console.log('onEndSurvey called');
};

storiesOf('Demographics', module)
    .add('with 5 questions', () => {
        return <Demographics onEndDemographicsSurvey={onEndDemographicsSurvey} />;
    });

storiesOf('Picture Survey', module)
    .add('questions', () => {
        return (<SurveyQuestions
            assignedCategory={'cocaine'}
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            surveyQuestionNumbers={[0, 1]}
            />);
    });
