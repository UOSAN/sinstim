import { connect } from 'react-redux';
import { onSubmitIntro } from '../../state/actions/action-creators';

// (state)
const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitIntro: () => dispatch(onSubmitIntro()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
