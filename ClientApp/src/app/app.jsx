import React from 'react';
import Intro from '../components/intro';

import './app.scss';

const App = (props) => {
    return (
        <div className="stim-app">
            <Intro {...props} />
        </div>
    );
};

export default App;
