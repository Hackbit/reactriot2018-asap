import React from 'react';
import ReactDOM from 'react-dom';
import PuppyRace from './PuppyRace';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PuppyRace />, div);
  ReactDOM.unmountComponentAtNode(div);
});
