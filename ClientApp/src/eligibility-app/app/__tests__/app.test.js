import React from 'react';
import { shallow } from 'enzyme';

import App from '../app';

let props;

beforeEach(() => {
    props = {
        onSaveUser: jest.fn(() => Promise.resolve())
    };
});

it('should match snapshot', () => {
    const wrapper = shallow(<App {...props} />);

    expect(wrapper).toMatchSnapshot();
});
