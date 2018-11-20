import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { Typography } from '@material-ui/core';
import App from '../components/App';

describe('<App /> Component', () => {
  it('renders a div', () => {
  	const wrapper = shallow(<App />);
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('has a material-ui <Typography /> component that says Rosetta Capstone', () => {
  	let shallow = createShallow();
  	const wrapper = shallow(<App />);
  	expect(wrapper.contains([<Typography variant='display1' color='textPrimary'>Rosetta Capstone</Typography>])).toBe(true);
  });
});
