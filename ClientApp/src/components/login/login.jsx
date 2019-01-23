import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import './login.scss';

class Login extends React.Component {
    constructor(props) {
      super(props);

      this.handleOnSubmitClick = this.handleOnSubmitClick.bind(this);
    }

    handleOnSubmitClick() {
        this.props.onSaveUser(this.textInput.value);
    }

    render() {
        return (
            <div className="id-login">
                <FormGroup bsSize="large" className="id-login-input-wrapper">
                    <FormControl type="text" placeholder="mTurk Id" inputRef={input => this.textInput = input} />
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
