import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { PuppyRace } from './PuppyRace';
import './index.css';

ReactDOM.render(
  <div class="App">
    <header className="App-header">
      <img src={require('./react-logo.svg')} className="App-logo" alt="logo" />
      <h1 className="App-title">React Puppy Race</h1>
    </header>
    <PuppyRace />
    <footer className="App-footer">
      <p>
        Dog and cat image are from{' '}
        <a href="https://dribbble.com/shots/2157574-BFF-s">BFF's</a> by{' '}
        <a href="https://dribbble.com/madebyradio">R A D I O</a>
      </p>
    </footer>
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
