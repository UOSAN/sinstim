import React from 'react';
import { storiesOf } from '@storybook/react';

import Demographics from '../src/eligibility-app/demographics/demographics';

import 'bulma/css/bulma.min.css/';

storiesOf('Demographics', module)
    .add('with 5 questions', () => {
        return <Demographics />;
    });
