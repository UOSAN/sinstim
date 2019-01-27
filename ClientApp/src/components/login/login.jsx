import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import './login.scss';

class Login extends React.Component {
    handleOnSubmitClick = () => {
        this.props.onSaveUser(this.textInput.value);
    }

    setTextInputRef = (inputRef) => {
        this.textInput = inputRef;
    }

    render() {
        return (
            <div className="id-login">
                <FormGroup bsSize="large" className="id-login-input-wrapper">
                    <FormControl inputRef={this.setTextInputRef} placeholder="mTurk Id" type="text" />
                </FormGroup>
                <Button className="id-login-button" onClick={this.handleOnSubmitClick}>submit</Button>
            </div>
        );
    }
}

Login.propTypes = {
    onSaveUser: PropTypes.func.isRequired,
};

export default Login;
