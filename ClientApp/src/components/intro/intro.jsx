import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

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
        const introText = 'Welcome this is the intro screen.'
        return (
            <div className="intro">
                <div className="intro-text">{introText}</div>
                <div>
                    <Button className="intro-submit" onClick={this.handleOnSubmitClick}>OK</Button>
                </div>
            </div>
        );
    }
}

Intro.propTypes = {
    onSubmitIntro: PropTypes.func.isRequired,
};

export default Intro;
