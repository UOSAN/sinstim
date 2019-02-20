import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        eligibilityCompletionCode: state.eligibilityCompletionCode
    };
};

export default connect(
    mapStateToProps
);
