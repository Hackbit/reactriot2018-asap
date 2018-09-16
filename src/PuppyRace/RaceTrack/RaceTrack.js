import React from 'react';
import { Lane } from './Lane';
import { PuppyRaceContext } from '../PuppyRaceContext';

export class RaceTrack extends React.Component {
  getTransitionStyle(state) {
    const transitionTime = state.tickInterval / 1000;
    return (
      <style>
        {`.racetrack * { transition: all linear ${transitionTime}s; }`}
      </style>
    );
  }

  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state }) => (
          <div className="racetrack">
            {this.getTransitionStyle(state)}
            {state.animals.map((animal, index) => (
              <Lane key={index} index={index} animal={animal} />
            ))}
          </div>
        )}
      </PuppyRaceContext.Consumer>
    );
  }
}
