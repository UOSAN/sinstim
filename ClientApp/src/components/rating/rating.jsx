import React from 'react';
import PropTypes from 'prop-types';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton, Button} from 'react-bootstrap';

import './rating.css';

class Rating extends React.Component {
    constructor(props) {
      super(props);

      this.handleOnSubmitClick = this.handleOnSubmitClick.bind(this);
    }

    handleOnSubmitClick() {
        this.props.onSaveRating(this.textInput.value);
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options">
                    <ToggleButton value={1}>Radio 1</ToggleButton>
                    <ToggleButton value={2}>Radio 2</ToggleButton>
                    <ToggleButton value={3}>Radio 3</ToggleButton>
                    <ToggleButton value={4}>Radio 4</ToggleButton>
                    <ToggleButton value={5}>Radio 5</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
                <Button className="rating-submit" onClick={this.handleOnSubmitClick}>submit</Button>
            </div>

        );
    }
}

Rating.propTypes = {
    onSaveRating: PropTypes.func.isRequired,
};

export default Rating;
