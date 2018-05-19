import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, FormGroup} from 'react-bootstrap';

import './login.css';

class Login extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: ''
      };
    }

    render() {
        return (
            <div>
                <FormGroup bsSize="large">
                    <FormControl type="text" placeholder="mTurk Id" />
                </FormGroup>
                <Button onClick={this.props.onSaveUser}>submit</Button>
            </div>
        );
    }
}

Login.propTypes = {
    onSaveUser: PropTypes.func.isRequired,
};

export default Login;
