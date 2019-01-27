import React from 'react';
import { shallow } from 'enzyme';

import Intro from './../intro';

it('should match snapshot', () => {
    const props = {
        onSubmitIntro: () => {}
    };

    const wrapper = shallow(<Intro {...props} />);

    expect(wrapper).toMatchSnapshot();
});
