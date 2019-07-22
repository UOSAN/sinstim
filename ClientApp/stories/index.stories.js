import React from 'react';
import { storiesOf } from '@storybook/react';

import Demographics from '../src/eligibility-app/demographics/demographics';
import Survey from '../src/survey-app/survey/survey';
import SurveyLoadingBar from '../src/survey-app/survey-loading-bar/survey-loading-bar';

import 'bulma/css/bulma.min.css/';

const onEndDemographicsSurvey = (answersData) => {
    console.log('onEndDemographicsSurvey: ', answersData);
};

const onStartEligibilitySurvey = () => {
    console.log('onStartEligibilitySurvey called');
};

storiesOf('Demographics', module)
    .add('with 5 questions', () => {
        return <Demographics onEndDemographicsSurvey={onEndDemographicsSurvey} onStartEligibilitySurvey={onStartEligibilitySurvey} />;
    });

const onRatePicture = ({ fileName, desirability, recognizability }) => {
    console.log('onRatePicture');
    console.log('fileName: ', fileName, 'desirability: ', desirability, 'recognizability: ', recognizability);
};

const onEndSurvey = () => {
    console.log('onEndSurvey called');
};

const picturesToRate = [{
    Path: '',
    FileName: 'alcohol_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'cocaine_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'heroin_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'marijuana_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'meth_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'pills_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'chocolate_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'cookies_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'donuts_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'fries_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'iceCream_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'pasta_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'pizza_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'bowls_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'buttons_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'cameras_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'chairs_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'clocks_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'fans_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'lights_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'pens_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'phones_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'radios_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'teapots_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'toothbrushes_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'umbrellas_0001.jpg',
    Category: ''
}, {
    Path: '',
    FileName: 'tobacco_0001.jpg',
    Category: ''
}];

storiesOf('Picture Survey', module)
    .add('all the sub categories', () => {
        return (<Survey
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            picturesToRate={picturesToRate}
            />);
    })
    .add('3 questions', () => {
        const threePicturesToRate = [{
            Path: '',
            FileName: 'alcohol_0001.jpg',
            Category: ''
        }, {
            Path: '',
            FileName: 'cocaine_0001.jpg',
            Category: ''
        }, {
            Path: '',
            FileName: 'heroin_0001.jpg',
            Category: ''
        }];

        return (<Survey
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            picturesToRate={threePicturesToRate}
            />);
    })
    .add('request in progress', () => {
        const threePicturesToRate = [{
            Path: '',
            FileName: 'alcohol_0001.jpg',
            Category: ''
        }, {
            Path: '',
            FileName: 'cocaine_0001.jpg',
            Category: ''
        }, {
            Path: '',
            FileName: 'heroin_0001.jpg',
            Category: ''
        }];

        return (<Survey
            onEndSurvey={onEndSurvey}
            onRatePicture={onRatePicture}
            picturesToRate={threePicturesToRate}
            requestInProgress={true}
            />);
    });


storiesOf('Picture Survey Loading Bar', module)
    .add('example', () => {
        return (<SurveyLoadingBar />);
    });
