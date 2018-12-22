import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import placeHolderText from './intro-text'

import './intro.css';

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
                    <Button onClick={this.handleOnSubmitClick}>OK</Button>
                </div>
            </div>
        );
    }
}

Intro.propTypes = {
    onSubmitIntro: PropTypes.func.isRequired,
};

export default Intro;
