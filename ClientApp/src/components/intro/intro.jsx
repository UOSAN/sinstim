import React from 'react';
import PropTypes from 'prop-types';
import placeHolderText from './intro-text';

import './intro.scss';

const Intro = (props) => {
    function handleOnSubmitClick() {
        console.log(props);
        props.onSubmitIntro();
    }

    return (
        <div className="intro">
            <div className="intro-text">{placeHolderText}</div>
            <div className="intro-submit">
                <button className="btn btn-primary" onClick={handleOnSubmitClick} type="button">OK</button>
            </div>
        </div>
    );
};

Intro.propTypes = {
    onSubmitIntro: PropTypes.func.isRequired,
};

export default Intro;
