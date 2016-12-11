import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Home from '../src/modules/Pages/Home/Home';

describe('<Home/>', function () {
  it('should have a div', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
