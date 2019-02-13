import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Consent from '../../components/common/consent';
import Instructions from '../../components/eligibility-instructions';

import './app.scss';

export default class App extends React.Component {
    static propTypes = {
        isConsented: PropTypes.bool,
        onSaveUser: PropTypes.func.isRequired
    };

    state = {
        isUserSaved: false
    };

    componentDidMount() {
        const { mTurkId } = queryString.parse(location.search);

        this.props.onSaveUser(mTurkId).then(() => {
            this.setState(() => {
                return {
                    isUserSaved: true
                };
            });
        });
    }

    render() {
        if (!this.state.isUserSaved) {
            return null;
        }

        return (
            <div className="eligibility-app">
                {!this.props.isConsented && <Consent {...this.props} />}
                {this.props.isConsented && <Instructions />}
            </div>
        );
    }
}
