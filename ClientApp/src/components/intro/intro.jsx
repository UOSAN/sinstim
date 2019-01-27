import React from 'react';
import PropTypes from 'prop-types';
import placeHolderText from './intro-text'

import './intro.scss';

class Intro extends React.Component {
    constructor(props) {
      super(props);

      this.handleOnSubmitClick = this.handleOnSubmitClick.bind(this);
    }

    handleOnSubmitClick() {
        this.props.onSubmitIntro();
    }

    render() {
        return (
            <div className="intro">
                <div className="intro-text">{placeHolderText}</div>
                <div className="intro-submit">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitClick}>OK</button>
                </div>
            </div>
        );
    }
}

Intro.propTypes = {
    onSubmitIntro: PropTypes.func.isRequired,
};

export default Intro;
