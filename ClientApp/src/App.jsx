import React from 'react';
import { connect } from 'react-redux';

import {
  onSaveUser
} from './actions/action-creators';

import Login from './components/login/login'

const App = (props) => {
  return (
      <div className="app">
          <Login {...props} />
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUser: (id) => dispatch(onSaveUser(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
