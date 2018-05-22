import App from './app';
import { connect } from 'react-redux';
import {
  onSaveUser
} from './../actions/action-creators';

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