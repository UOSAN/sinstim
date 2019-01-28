import React from 'react';
import { shallow } from 'enzyme';

import Consent from '../consent';

it('should match snapshot', () => {
    const props = {
        onSubmitConsent: () => {}
    };

    const wrapper = shallow(<Consent {...props} />);

    expect(wrapper).toMatchSnapshot();
});
