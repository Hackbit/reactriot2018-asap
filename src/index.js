import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { PuppyRace } from './PuppyRace';
import logo from 'logo.svg';
import './index.css';

ReactDOM.render(
  <div class="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">React Puppy Race</h1>
    </header>
    <PuppyRace />
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
