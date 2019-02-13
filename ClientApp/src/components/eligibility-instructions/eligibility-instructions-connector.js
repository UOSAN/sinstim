import { connect } from 'react-redux';
import { onEligibilityInstructionsAccept } from '../../state/actions/action-creators';

const mapDispatchToProps = (dispatch) => {
    return {
        onEligibilityInstructionsAccept: () => dispatch(onEligibilityInstructionsAccept()),
    };
};

export default connect(
    null,
    mapDispatchToProps
);
