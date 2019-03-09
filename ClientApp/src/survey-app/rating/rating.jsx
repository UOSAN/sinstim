import React from 'react';
import PropTypes from 'prop-types';

import './rating.scss';

const RADIO_BUTTONS = [{
    label: '1',
    value: 1,
    key: 'one'
}, {
    label: '2',
    value: 2,
    key: 'two'
}, {
    label: '3',
    value: 3,
    key: 'three'
}, {
    label: '4',
    value: 4,
    key: 'four'
}, {
    label: '5',
    value: 5,
    key: 'five'
}];

const Rating = (props) => {
    const { ratingName, currentPictureFileName } = props;

    function handleOnChange(evt) {
        props.onRatingChange(evt.target.value);
    }

    function renderRadioButtons() {
        const buttonsElements = RADIO_BUTTONS.map((button) => {
            return (
                <label className="radio" key={currentPictureFileName + button.key}>
                    <input
                        className="radio"
                        id={`radio-${button.key}`}
                        name={ratingName}
                        onChange={handleOnChange}
                        type="radio"
                        value={button.value}
                        />
                    {button.label}
                </label>
            );
        });

        return (
            <div className="control">
                {buttonsElements}
            </div>
        );
    }

    return (
        <div className="rating">
            {renderRadioButtons()}
        </div>
    );
};

Rating.propTypes = {
    currentPictureFileName: PropTypes.string.isRequired,
    onRatingChange: PropTypes.func.isRequired,
    ratingName: PropTypes.string.isRequired
};

export default Rating;
