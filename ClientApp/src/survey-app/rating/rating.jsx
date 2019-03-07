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
    function handleOnChange(evt) {
        props.onRatingChange(evt.target.value);
    }

    function renderRadioButtons() {
        const buttonsElements = RADIO_BUTTONS.map((button) => {
            return (
                <div className="form-check form-check-inline" key={button.key}>
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            id={`radio-${button.key}`}
                            name={props.name}
                            onChange={handleOnChange}
                            type="radio"
                            value={button.value}
                            />
                        {button.label}
                    </label>
                </div>
            );
        });

        return (
            <div>
                {buttonsElements}
            </div>
        );
    }

    return (
        <>
            {renderRadioButtons()}
        </>
    );
};

Rating.propTypes = {
    name: PropTypes.string.isRequired,
    onRatingChange: PropTypes.func.isRequired
};

export default Rating;
