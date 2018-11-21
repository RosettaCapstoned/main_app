import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { Typography } from '@material-ui/core';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import App from '../components/App';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import Header from '../components/Header';


describe('<Header /> Component', () => {
  it('renders a div', () => {
  	const wrapper = shallow(<Header />);
    expect(wrapper.find('div')).toHaveLength(2);
  });

  it('has a material-ui <Typography /> component that says Rosetta Capstone', () => {
  	let shallow = createShallow();
  	const wrapper = shallow(<Header />);
  	expect(wrapper.contains([<Typography variant='display1' color='textPrimary'>Rosetta Capstone</Typography>])).toBe(true);
  });
});

describe('<App /> Component', () => {

  it('has a router that can take you to the landing page', () => {
  	const wrapper = mount(
  	  <MemoryRouter initialEntries={[ '/' ]}>
  	    <App />
  	  </MemoryRouter>)

  	expect(wrapper.find(Header)).toHaveLength(1);
  	expect(wrapper.find(LandingPage)).toHaveLength(0);
  })

  it('has a router that can take you to the login form', () => {
  	const wrapper = mount(
  	  <MemoryRouter initialEntries={[ '/login']}>
  	    <App />
  	  </MemoryRouter>)

  	expect(wrapper.find(Header)).toHaveLength(1);
  	expect(wrapper.find(Login)).toHaveLength(0);
  })

  it('has a router that always show header', () => {
  	const wrapper = mount(
  	  <MemoryRouter initialEntries={[ '/random']}>
  	    <App />
  	  </MemoryRouter>)

  	expect(wrapper.find(Header)).toHaveLength(1);
  	expect(wrapper.find(LandingPage)).toHaveLength(0);
  	expect(wrapper.find(Login)).toHaveLength(0);
  })
});
